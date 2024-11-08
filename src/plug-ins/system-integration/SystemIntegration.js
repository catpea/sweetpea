import EventEmittter from 'event-emitter';
import {PortParameter, Parameter} from 'system-parameters';

export class SystemWorker extends EventEmittter {

  stage;
  queue;
  buffer;

  input = new PortParameter({description: "Input port for the node, located on the left side." });
  output = new PortParameter({portDirection: "right", description: "Output port for the node, located on the right side." });

  constructor({queue, buffer, stage}){
    super();
    this.stage = stage; //NOTE: this is the emitter
    this.queue = queue;
    this.buffer = buffer;
  }

  async connect(){

    // console.log('connect', this.constructor.name);

    // Let's make the code a bit more readable
    const actor = this;
    const stage = this.stage;
    const queue = this.queue;
    const buffer = this.buffer;

    // When message is sent to this actor
    actor.on('input', input => {
      // console.log(`${this.constructor.name} got input packet!`, input);

      queue.enqueue( input );
    });

    // When a new order is added to the queue
    queue.on('enqueue', async order => {

      // console.log(`${this.constructor.name} queue order!`, order);

      if(order === undefined) throw new Error('Enqueue Work order must be an object');
      const product = await this.process(order);
      // console.log(`${this.constructor.name} PRODUCT`, product);

      // EARLY EXIT
      if(product === undefined){
        queue.remove(order.id);
        return; // STOP RUN, nothing to pass along, not return value
      }

      // CONTINUE
      // Store the finished product in the buffer
      if(Array.isArray(product)){
        for (const item of product) {
          buffer.enbuffer(item);
        }
      }else{
        buffer.enbuffer(product);
      }
      queue.remove(order.id);

    });

    // When a product is added to the buffer
    buffer.on('enbuffer', product => {
      // Send the product out to another part of the system
      actor.send('output', product );

      // Remove the product from the buffer since it's no longer needed
      buffer.remove(product);
    });

    // Control protocol aka DATA PULL
    actor.on('control', control=>{
      // console.log(`${this.constructor.name} got control packet!`, control);
      switch(control.event) {
        case 'request':
          actor.transmit(control.event||1);
          break;
        case 'quiesce':
          actor.pause();
          break;
        default:
          console.info('unknown control', control.event);
      }
    });

  }

  // CONTROL
  transmit(max=Infinity){
    //console.log('BUFFER TRANSMIT', this.constructor.name);
    this.#pause = false;
    let sentCount = 0;

    for (const product of this.buffer) {
      if(this.#pause) break;
      this.send('output', product );
      sentCount++;
      if(sentCount>max) break;
    }

  }

  #pause = false;

  pause(){
    this.#pause = true;
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
