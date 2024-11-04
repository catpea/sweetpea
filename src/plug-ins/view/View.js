export default class View {

  #garbage = [];

  core;

  constructor({core}){
    this.core   = core;
  }

  mount(){
  }

  destroy(){
    this.#garbage.map(o=>o.subscription())
  }

  flip(card){
    this.core.flipTo(card);
  }

}
