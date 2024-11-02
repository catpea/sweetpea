import {Actor} from 'actor';

export default class DeveloperConsole extends Actor {

  static parameters = [
    { name:"type",   default:'dir',    type:'string', description:'dir, log, debug, info, warn' },
  ];

  async work(parameters){
    console.warn(`DeveloperConsole ${this.id} on in: parameters`, parameters);
    console.warn(`DeveloperConsole ${this.id} on in:  console[parameters.type]`,  console[parameters.type]);

    console[parameters.type].bind(console)(parameters.value);
    return parameters.value; // pass it on
  }

}
