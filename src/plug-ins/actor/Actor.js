import EventEmitter from 'event-emitter';

// NOTE: Superclassed by src/worker/[category]/[name]/index.js
export class Actor extends EventEmitter {

  garbage = [];

  constructor({ options, stage, worker, queue, buffer }){

    // NOTE: /home/meow/Universe/Development/npm/sweetpea/src/plug-ins/water-closet/queue-and-buffer/QueueAndBuffer.js

    super();
    this.queue = queue;
    this.buffer = buffer;
    const actor = this;

      // When message is sent to the actor
      actor.on('in', message => {

        // A job is the incoming packet layed over a dataset.
        console.warn('Actor on in', message);
        const job = Object.assign(options, message);
        queue.enqueue( job );

      });

      // When a new order is added to the queue
      queue.on('enqueue', async order => {
        const product = await this.work(order);
        // Store the finished product in the buffer
        buffer.enbuffer(product);
        // Remove the order from the queue, since it's been processed
        queue.remove(order.id);
      });

      // When a product is added to the buffer
      buffer.on('enbuffer', product => {
        // Send the product out to another part of the system
        actor.send('out', product );
        // Remove the product from the buffer since it's no longer needed
        buffer.remove(product.id);
      });

      // .__. //

      actor.on('control', control=>{
        console.log('actor.on(control', control);
        switch(control.event) {
          case 'request':
            actor.transmit(control.event||1);
            break;
          case 'quiesce':
            actor.pause();
            break;
          default:
            console.log('unknown control', control.event);
        }
      });

      // stage.on('ping', ()=>{
      //   stage.send('pong');
      // });
      //
      // stage.on('exit', ()=>{
      //   console.log('K, bye!');
      // });

  }

  // CONTROL
  transmit(max=Infinity){
    console.log('BUFFER TRANSMIT', this.constructor.name);
    this.#pause = false;
    let sentCount = 0;
    for (const product of this.buffer) {
      if(this.#pause) break;
      this.send('out', product );
      sentCount++;
      if(sentCount>max) break;
    }
  }

  #pause = false;
  pause(){
    this.#pause = true;
  }

  worker(){
    // Override in Subclass, plz.
  }


}
