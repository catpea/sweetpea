import {Worker} from 'actor';

export default class Fetch extends Worker {
  stage;

  constructor(stage){
    super();
    //
    // this.stage = stage;
    //
    // this.listenTo(stage.director, 'play', this.produce);
    // this.listenTo(stage.director, 'stop', this.stop);
    // this.listenTo(stage.director, 'exit', this.exit);

  }

  async produce(){
    console.log('Fetch heard play!!!!!!');
    try {
      const response = await fetch(this.data.url||'menu.json');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      this.pipe.emit('out', {data})
    } catch (error) {
      console.error(error.message);
    }
  }



}
