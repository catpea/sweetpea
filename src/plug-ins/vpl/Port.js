import System from './VplSystem.js';

export default class Port extends HTMLElement {
  #system;

  constructor() {
    super();
    this.#system = new System(this);
  }

  connectedCallback() {
    if(this.#system.ready) this.#system
    .attachShadow()
    .setContextFromString()
    .adoptCss()
    .injectTemplateFromTagName()
    .consumeScript()
    .normalizeTemplate()
    .unfurlTemplate()
    .renderDelegate()
    .createElementPipe()
    .wrapAttributeEvents()
    .bindDoubleCurly()
      .useExtensions()
  }

  disconnectedCallback() {
    if(this.#system.ready) this.#system
    .removeSubscription();
  }
  get pipe(){
    return this.#system.pipe
  }
  get context(){
    return this.#system.retrieveContext()
  }
  set context(v){
    this.#system.updateContext(v);
  }

}
