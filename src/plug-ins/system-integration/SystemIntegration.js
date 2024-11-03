import EventEmittter from 'event-emitter';
import {PortParameter, Parameter} from 'system-parameters';

export class SystemWorker extends EventEmittter {

  stage;

  inputPort     = new PortParameter({description: "Input port for the node, located on the left side." });
  outputPort    = new PortParameter({portDirection: "right", description: "Output port for the node, located on the right side." });

  constructor(stage){
    super();
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





  // util

  get parameters(){
    const parameters = [];
    const properties = Object.getOwnPropertyNames(this);
    properties.forEach(property => {
      const value = this[property];
        if (value && value.subscribe) {
        if (value instanceof Parameter) {
          parameters.push( [property,value.value] );
        }
      }
    });
    return Object.fromEntries(parameters);
  }

}

export default {SystemWorker}
