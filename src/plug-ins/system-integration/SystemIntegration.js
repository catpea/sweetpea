import EventEmittter from 'event-emitter';
import {PortParameter, Parameter} from 'system-parameters';

export class SystemWorker extends EventEmittter {

  stage;

  input = new PortParameter({description: "Input port for the node, located on the left side." });
  output = new PortParameter({portDirection: "right", description: "Output port for the node, located on the right side." });

  constructor(stage){
    super();
    this.stage = stage;
  }

  async connect(){
    // import EventEmitter from 'event-emitter';
    // import Signal from 'signal';
    //
    //
    // // NOTE: Superclassed by src/worker/[category]/[name]/index.js
    // export class Actor extends EventEmitter {
    //   #db;
    //   garbage = [];
    //   hasInput = new Signal(true);
    //   hasOutput = new Signal(true);
    //   //NOTE: /home/meow/Universe/Development/npm/sweetpea/src/plug-ins/water-closet/actor-integration/ActorIntegration.js
    //   constructor({ id, options, stage, worker, queue, buffer, db }){
    //
    //     // NOTE: /home/meow/Universe/Development/npm/sweetpea/src/plug-ins/water-closet/queue-and-buffer/QueueAndBuffer.js
    //
    //     super();
    //
    //     this.#db = db;
    //     this.id = id;
    //     //console.log('AAA', this.#db, this.id);
    //
    //     this.stage = stage;
    //     this.queue = queue;
    //     this.buffer = buffer;
    //
    //     const actor = this;
    //
    //       // When message is sent to the actor
    //       actor.on('in', message => {
    //
    //         // A job is the incoming packet layed over a dataset.
    //         // //console.warn(`Actor ${id} on in: message`, message);
    //         // //console.warn(`Actor ${id} on in: options`, options);
    //         const job = Object.assign(options, message);
    //         //console.warn(`Actor ${id} on in: job`, job);
    //         queue.enqueue( job );
    //
    //       });
    //
    //       // When a new order is added to the queue
    //       queue.on('enqueue', async order => {
    //
    //         if(order === undefined) throw new Error('Enqueue Work order must be an object');
    //
    //         const product = await this.work(order);
    //
    //         if(product === undefined){
    //           queue.remove(order.id);
    //           return; // STOP RUN
    //         }
    //
    //         // Store the finished product in the buffer
    //         if(Array.isArray(product)){
    //           for (const item of product) {
    //             buffer.enbuffer(item);
    //           }
    //         }else{
    //           buffer.enbuffer(product);
    //         }
    //
    //         queue.remove(order.id);
    //       });
    //
    //       // When a product is added to the buffer
    //       buffer.on('enbuffer', product => {
    //         // Send the product out to another part of the system
    //         actor.send('out', {value:product} );
    //         // Remove the product from the buffer since it's no longer needed
    //         buffer.remove(product);
    //       });
    //
    //       // .__. //
    //
    //       actor.on('control', control=>{
    //         //console.log('actor.on(control', control);
    //         switch(control.event) {
    //           case 'request':
    //             actor.transmit(control.event||1);
    //             break;
    //           case 'quiesce':
    //             actor.pause();
    //             break;
    //           default:
    //             //console.log('unknown control', control.event);
    //         }
    //       });
    //
    //       // stage.on('ping', ()=>{
    //       //   stage.send('pong');
    //       // });
    //       //
    //       // stage.on('exit', ()=>{
    //       //   //console.log('K, bye!');
    //       // });
    //
    //   }
    //
    //   get db(){
    //     return this.#db( this.id );
    //   }
    //
    //
    //   // CONTROL
    //   transmit(max=Infinity){
    //     //console.log('BUFFER TRANSMIT', this.constructor.name);
    //     this.#pause = false;
    //     let sentCount = 0;
    //     for (const product of this.buffer) {
    //       if(this.#pause) break;
    //       this.send('out', product );
    //       sentCount++;
    //       if(sentCount>max) break;
    //     }
    //   }
    //
    //   #pause = false;
    //   pause(){
    //     this.#pause = true;
    //   }
    //
    //   worker(){
    //     // Override in Subclass, plz.
    //   }
    //
    //
    // }

  }

  async connected(){ // connect to stage
    // subscribe
  }

  async disconnected(){ // disconnect from stage
    // unsubscribe
  }

  async diagnostic(){
  }

  async process(input){
  }

  // util

  get parameters(){
    const parameters = [];
    const properties = Object.getOwnPropertyNames(this);
    properties.forEach(name => {
      const value = this[name];
        if (value && value.subscribe) {
        if (value instanceof Parameter) {
          const type = value.constructor.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/-parameter$/,'');
          const label = name.replace(/([A-Z])/,' $1').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
          const entry = {name, type, label, ...value.value}
          parameters.push( entry );
        }
      }
    });
    return parameters;
  }

}

export default {SystemWorker}
