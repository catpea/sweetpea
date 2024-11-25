// import EventEmittter from 'event-emitter';
import {PortParameter, Parameters} from 'system-parameters';

export class SystemWorker {

  // overwritten by each component
  parameters = new Parameters([]);

  input = new PortParameter({enabled: true,                         description: "Input port for the node, located on the left side."   });
  output = new PortParameter({enabled: true, portDirection: "right", description: "Output port for the node, located on the right side." });

  constructor({ id, queue, buffer, stage, data, cables, actor }){
    this.id = id;
    this.queue = queue;
    this.buffer = buffer;
    this.stage = stage;
    this.data = data;
    this.cables = cables;
    this.actor = actor;
  }

  async start() {
  }

  async process(input, parameters){
    return input;
  }

  async diagnostic(){
  }

  async stop(){
    this.collectGarbage()
  }

  // Garbage Manager
  subscriptions = [];
  collectGarbage(){ this.subscriptions.forEach(s=>s.subscription()) }
  set gc(subscription){  this.subscriptions.push( {type:'gc-standard', id:'gc-'+this.subscriptions.length, subscription} ) }
}

export default {SystemWorker}
