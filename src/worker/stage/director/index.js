import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter, EventParameter} from 'system-parameters';

export default class StageDirector extends SystemWorker {

  start = new EventParameter({});
  stop  = new EventParameter({});

  async connect(){
    await super.connect();

    // Stage Director has its own connect protocol.

    this.stage.on('start', message => {
      console.log('sending start-message:control');
      this.send('start-message:control', { event: 'request' });
    });
    this.stage.on('exit', message => {
      this.send('exit-message:control', { event: 'request' });
    });

    this.on('start-message', packet=>{
      console.info(`StageDirector got start-message`, packet);
      this.send('start-event', packet);
    });

    this.on('exit-message', packet=>{
      console.info(`StageDirector got exit-message`, packet);
      this.send('exit-event', packet);
    });
  }

  async connected(){
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
  }

  async process(input, parameters){
    const date = new Date();
    const timestamp = date.toISOString()
    result = {timestamp, input};
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
