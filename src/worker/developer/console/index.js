import {Worker} from 'actor';

export default class developerConsole extends Worker {

  static parameters = [
    { name:"type",   default:'dir',    type:'String', description:'dir, log, debug, info, warn' },
  ];

  async work(parameters){
    return console[parameters.type](parameters.input);
  }

}
