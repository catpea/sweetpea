import {Worker} from 'actor';

export default class developerConsole extends Worker {

  static parameters = [
    { name:"start",   default:null, type:'event', description:'Sends object on start.' },
    { name:"stop",   default:null, type:'event', description:'Sends object on stop.' },
  ];

  async work(parameters){
    return console[parameters.type](parameters.input);
  }

}
