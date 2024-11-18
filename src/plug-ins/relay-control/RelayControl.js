import EventEmittter from 'event-emitter';

export class RelayControl {

  constructor({id, stage, actor, worker, data, queue, buffer, parameters, cables}){

    this.id  = id;   // this is the node id
    this.stage  = stage;   // this is the emitter
    this.worker  = worker;   // worker has parameters, start, stop, and process
    this.data  = data;   // worker has parameters, start, stop, and process

    this.queue  = queue;   // Put jobs in here
    this.buffer = buffer;  // when a job is complete it is put in the buffer

    this.parameters   = parameters; // component data
    this.cables = cables;   // cable information

    this.actor = actor;
  }

  async connect() {

    this.gc = this.stage.on("start", (message) => {
      if (this.cables.input.count === 0) this.actor.send("input", message ?? { source: this.id }, {});
    });

    this.gc = this.actor.on("input", (input) => {
      this.actor.send('output', input)
    });
  }

  async disconnect() {
    this.collectGarbage();
  }




  // Garbage Manager
  subscriptions = [];
  collectGarbage(){ this.subscriptions.forEach(s=>s.subscription()) }
  set gc(subscription){  this.subscriptions.push( {type:'gc-standard', id:'gc-'+this.subscriptions.length, subscription} ) }


}
