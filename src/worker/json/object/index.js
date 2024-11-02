import {Actor} from 'actor';

export default class JsonObject extends Actor {

  static parameters = [
    { name:"object",   default:'{"url":"example.com"}',    type:'string', description:'JSON Object' },
  ];

  constructor({ stage, worker, queue, cache }){
    super(...arguments);
    const actor = this;
    this.hasInput.value = false;
  }

  transmit(){
    this.buffer.enbuffer({value:'ALL WORK ALL PLAY'});
    super.transmit(...arguments);
  }

  async work(parameters){
    return {value:'WORK'}
  }

}
