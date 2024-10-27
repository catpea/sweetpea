import {Actor} from 'actor';

export default class DeveloperConsole extends Actor {

  static parameters = [
    { name:"type",   default:'dir',    type:'string', description:'dir, log, debug, info, warn' },
  ];

  async work(parameters){
    return console[parameters.type](parameters.input);
  }

}
