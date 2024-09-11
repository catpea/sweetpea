import System from './FireSystem.js';

export default class Fire extends HTMLDivElement {
  #system;

  constructor() {
    super();
    this.#system = new System(this);
  }

  connectedCallback() {
    if(this.#system.ready) this.#system
    .installServices();
  }

  disconnectedCallback() {
    if(this.#system.ready) this.#system
    .removeSubscription();
  }

}
