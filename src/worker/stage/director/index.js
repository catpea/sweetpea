import {Actor} from 'actor';

export default class StageDirector extends Actor {

  static parameters = [
    { name:"start",   default:"start", type:'event', description:'Sends object on start.' },
    { name:"stop",    default:"stop", type:'event', description:'Sends object on stop.' },
  ];

  // Special installer for director which pulls packets.
  constructor({ stage, worker, queue, cache }){
    super(...arguments);
    const actor = this;

    actor.hasInput.value = false;
    actor.hasOutput.value = false;

    stage.on('start', message => {
      actor.send('start-message:control', { event: 'request' });
    });
    stage.on('exit', message => {
      actor.send('exit-message:control', { event: 'request' });
    });

    actor.on('start-message', packet=>{
      console.info(`StageDirector got start-message`, packet);
      actor.send('start-event', packet);
    });

    actor.on('exit-message', packet=>{
      console.info(`StageDirector got exit-message`, packet);
      actor.send('exit-event', packet);
    });

  }

  // Override in Subclass
  async worker({value}){
    const date = new Date();
    const timestamp = date.toISOString()
    return {timestamp, value};
  }

}
