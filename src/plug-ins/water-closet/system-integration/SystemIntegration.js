import EventEmittter from 'event-emitter';

export class SystemWorker extends EventEmittter {

  stage = null;

  inputPort     = new PortParameter({description: "Input port for the node, located on the left side." });
  outputPort    = new PortParameter({portDirection: "right", description: "Output port for the node, located on the right side." });

  constructor(stage){
    this.stage = stage;
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

}

export default {SystemWorker}
