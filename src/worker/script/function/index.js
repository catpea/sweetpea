import {Actor} from 'actor';

export default class ScriptFunction extends Actor {

  static parameters = [
    { name:"script",   default:'()=>{}',    type:'string', description:'JavaScript Function' },
  ];

  async work(parameters){
    return console[parameters.type](parameters.input);
  }

}
