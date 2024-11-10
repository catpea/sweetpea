import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class StageComment extends SystemWorker {

  text = new StringParameter({defaultValue: ``, description: "Stage Comment" });

  async connected(){
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
  }

  // async process(input, {json}){
  //   const result = JSON.parse(json);
  //   return result;
  // }

  async transmit(number, {json}){
    this.buffer.enbuffer(JSON.parse(json));
    super.transmit(...arguments);
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}


// import {Actor} from 'actor';
//
// export default class JsonObject extends Actor {
//
//   static parameters = [
//     { name:"object",   default:'{"url":"example.com"}',    type:'string', description:'JSON Object' },
//   ];
//
//   constructor({ stage, worker, queue, cache }){
//     super(...arguments);
//     const actor = this;
//     this.hasInput.value = false;
//   }
//
//   transmit(){
//     this.buffer.enbuffer({value:'ALL WORK ALL PLAY'});
//     super.transmit(...arguments);
//   }
//
//   async work(parameters){
//     return {value:'WORK'}
//   }
//
// }
