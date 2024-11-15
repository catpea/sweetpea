import {SystemWorker} from 'system-integration';
import {Parameters, EnumParameter, TextParameter} from 'system-parameters';

export default class StageComment extends SystemWorker {

  parameters = new Parameters([
    new TextParameter({name: 'text', defaultValue: ``, description: "Stage Comment" }),
  ]);


  async connected(){
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
  }

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
