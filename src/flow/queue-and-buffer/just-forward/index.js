import { RelayControl } from 'relay-control';

export default class JustForward extends RelayControl {

  connect() {
    //console.log(`executing JustForward RelayControl connect()`);

    // If no incoming connections, this is a producer
    // take message from the scene and use it as job
    this.gc = this.stage.on("start", (message) => {
      const hasIncomingLinks = this.cables.input.count > 0;
      const isActingProducer = !hasIncomingLinks;

      // NOTE: input simulation
      const packet = {
        source: this.id,
        cdate: new Date().toISOString(),
      };
      if (isActingProducer) this.actor.send("input", message ?? packet, {});
    });

    this.gc = this.stage.on('stop', message => {
      console.log('Stop');
    });
    this.gc = this.stage.on('kill', message => {
      console.log('Poison Pill');
    });

    //
    this.gc = this.actor.on("input", (input) => {
      this.queue.enqueue(input);
    });

    // When a new order is added to the queue
    this.gc = this.queue.on("enqueue", async (order) => {
      // console.log(`${this.constructor.name} queue order!`, order);

      if (order === undefined)
        throw new Error("Enqueue Work order must be an object");
      const product = await this.worker.process(order, this.data.parameters);
      // console.log(`${this.constructor.name} PRODUCT`, product);

      // EARLY EXIT
      if (product === undefined || product === null) {
        this.queue.remove(order.id);
        return; // STOP RUN, nothing to pass along, not return value
      }

      // CONTINUE
      // Store the finished product in the buffer
      if (Array.isArray(product)) {
        for (const item of product) {
          this.buffer.enbuffer(item);
        }
      } else {
        this.buffer.enbuffer(product);
      }
      this.queue.remove(order.id);
    });

    // When a product is added to the buffer
    this.gc = this.buffer.on("enbuffer", (product) => {
      // Send the product out to another part of the system
      this.actor.send("output", product);

      // Remove the product from the buffer since it's no longer needed
      this.buffer.remove(product);
    });

  } // connect
}
