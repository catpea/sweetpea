import interpolate from 'interpolate';
import {SystemWorker} from 'system-integration';
import {Parameters, TextareaParameter, InputParameter} from 'system-parameters';

export default class ShadowTree extends SystemWorker {

  parameters = new Parameters([
    // new InputParameter({name: 'name', type:'text', defaultValue: `my-component`, description: "Element name"}),
    // new InputParameter({name: 'slots', type:'number', defaultValue: `2`, description: "Element name"}),
    new TextareaParameter({name: 'template', defaultValue: ``, description: "Web Component ", rows:20 }),
  ]);

  async connected(){
    // this.input.alter(v=>v.showPort=false);
    // this.output.alter(v=>v.showPort=false);
    // console.log(this.data.parameters);
    // this.data.template.subscribe(html => {
    //   console.log('HTML CHANGED', html);

    // })

  }

  async process(input, { template }) {
    if (typeof input !== 'string') input = "";

    const result = interpolate(template, { input }, new RegExp('{{([^}]+)}}', 'g'))
    return result;

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
