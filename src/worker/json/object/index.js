import {Actor} from 'actor';

export default class JsonObject extends Actor {

  static parameters = [
    { name:"object",   default:'{"url":"example.com"}',    type:'string', description:'JSON Object' },
  ];

  async work(parameters){
    return console[parameters.type](parameters.input);
  }

}
