import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter} from 'system-parameters';

export default class StageListener extends SystemWorker {

  event = new StringParameter({defaultValue: `start`, description: "Name of stage event to monitor" });

  async connected(){
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
