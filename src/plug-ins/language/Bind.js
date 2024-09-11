import System from '../../System.js';

export default class Print extends HTMLElement {
  #system;

  constructor() {
    super();
    this.#system = new System(this);
  }

  connectedCallback() {
    if(this.#system.ready) this.#system
    .setContextFromString()
    .attachShadow()
    .renderValue()
  }

  disconnectedCallback() {
    if(this.#system.ready) this.#system
    .removeSubscription();
  }

  get context(){
    return this.#system.retrieveContext()
  }
  set context(v){
    this.#system.updateContext(v);
  }

}
