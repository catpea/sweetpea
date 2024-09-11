import System from './VplSystem.js';

export default class Program extends HTMLElement {
  #system;

  constructor() {
    super();
    this.#system = new System(this);
  }

  connectedCallback() {
    if(this.#system.ready) this.#system
    .attachShadow()
    .adoptCss()
    .injectTemplateFromAttribute()
    .consumeScript()
    .normalizeTemplate()
    .unfurlTemplate()
    .setContextFromString()
    .renderDelegate()
    .createElementPipe()
    .wrapAttributeEvents()
    .bindInputs()

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
