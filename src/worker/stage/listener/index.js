import {SystemWorker} from 'system-integration';
import {Parameters, StringParameter} from 'system-parameters';

export default class StageListener extends SystemWorker {

  parameters = new Parameters([
    new StringParameter({name:'event', defaultValue: `start`, description: "Name of stage event to emit" }),
  ]);

  async start(){
    this.input.alter(v=>v.showPort=false);

    this.gc = this.stage.on('*', (eventName, message) => {
      if (eventName == this.data.parameters.event) {
        this.queue.enqueue( message ?? eventName );
      }
    });

  }

  async process(input, {json}){
    const result = input;
    return result;
  }



  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
