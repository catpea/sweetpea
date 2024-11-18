import { RelayControl } from 'relay-control';

export default class CombineLatest extends RelayControl {

  holdingBuffer = {};

  connect() {

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
    this.gc = this.actor.on("input", (input, {fromCable}) => {
      if(!fromCable) return
      if (this.holdingBuffer[fromCable] == input) return; // ignore same data, await changes
      this.holdingBuffer[fromCable] = input;
      //console.log(this.cables.input.count, Object.entries(this.holdingBuffer).length, this.holdingBuffer, Object.entries(this.holdingBuffer).filter(o=>o[1] !== undefined) );
      if(this.cables.input.count == Object.entries(this.holdingBuffer).length) this.queue.enqueue(Object.values(this.holdingBuffer));

    });

    // When a new order is added to the queue
    this.gc = this.queue.on("enqueue", async (orders) => {
      // console.log('WORK ORDERS', orders);
      const result = [];

      for (const order of orders) {
        if (order === undefined) throw new Error("Enqueue Work order must be an object");
        const product = await this.worker.process(order, this.data.parameters);
        result.push(product);
      }
      this.queue.remove(orders);
      this.buffer.enbuffer(result);

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
