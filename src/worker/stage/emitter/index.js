import {SystemWorker} from 'system-integration';
import {Parameters, StringParameter} from 'system-parameters';

export default class StageEmitter extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name:'event', defaultValue: `start`, description: "Name of stage event to monitor" }),
  ]);

  async connected(){
    this.output.alter(v=>v.showPort=false);
    this.removeAllListeners('input');
    this.gc = this.on('input', input => {
      this.stage.send(this.data.parameters.event, input );
    });
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
