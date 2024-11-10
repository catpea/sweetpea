import {SystemWorker} from 'system-integration';
import {EnumParameter, StringParameter, EventParameter} from 'system-parameters';

export default class StageDirector extends SystemWorker {

  start = new EventParameter({});
  stop  = new EventParameter({});

  async connect(){
    await super.connect();

    // Stage Director has its own connect protocol.

    this.gc = this.stage.on('start', message => {
      console.log('Stage Director: sending start-message:control');
      this.send('start-message:control', { event: 'request' });

    });
    this.gc = this.stage.on('stop', message => {
      console.log('sending stop-message:control');
      this.send('stop-message:control', { event: 'request' });
    });

    this.on('start-message', packet=>{
      console.info(`StageDirector got start-message`, packet);
      this.send('start-event', packet);
    });

    this.on('stop-message', packet=>{
      console.info(`StageDirector got stop-message`, packet);
      this.send('stop-event', packet);
    });
  }

  async connected(){
    this.input.alter(v=>v.showPort=false);
    this.output.alter(v=>v.showPort=false);
  }

  async process(input, parameters){
    const date = new Date();
    const timestamp = date.toISOString()
    const result = {timestamp, input};
    return result;
  }

  async diagnostic(){
    const input = Math.random();
    const actual = await this.process(input);
    const expected = input;
    console.assert(actual, expected);
  }

}
