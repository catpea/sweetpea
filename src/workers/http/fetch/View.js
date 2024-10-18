import Worker from './Worker.js';

export default class View {
  worker;

  stage;
  core;
  root;
  data;
  pipe;

  constructor({stage, core, root, pipe, data}){
    this.stage = stage;
    this.core = core;
    this.root = root;
    this.pipe = pipe;
    this.data = data;

    this.worker = new Worker(stage);
  }

  mount(){
    console.log('xxxxxxxxxxxxxx MOUNT!!!');
  }

  destroy(){
  }

  flip(card){
    this.core.flipTo(card);
  }

}
