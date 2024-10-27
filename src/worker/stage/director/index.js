import {Actor} from 'actor';

export default class StageDirector extends Actor {

  static parameters = [
    { name:"start",   default:"start", type:'event', description:'Sends object on start.' },
    { name:"stop",    default:"stop", type:'event', description:'Sends object on stop.' },
  ];

  // Special installer for director which pulls packets.
  constructor({ stage, actor, worker, queue, cache }){
    super(...arguments);
    // stage.on('start', message => {
    //   actor.send('start-object:control', { event: 'request' });
    //   actor.send('exit-object:control', { event: 'request' });
    // });
  }

  // Override in Subclass
  async worker({value}){
    const date = new Date();
    const timestamp = date.toISOString()
    return {timestamp, value};
  }

}
