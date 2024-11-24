import { SystemWorker } from 'system-integration';
import { Parameters, TextParameter } from 'system-parameters';

export default class StageToast extends SystemWorker {

  parameters = new Parameters([
    new TextParameter({name: 'message', defaultValue: ``, description: "Toast message" }),
  ]);

  async start(){
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
