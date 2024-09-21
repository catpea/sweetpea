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
    // .registerWithScene()
    .createElementPipe()
    .injectTemplateFromAttribute()
    .consumeScript()
    .normalizeTemplate()
    .unfurlTemplate()
    .setContextFromString()
    .renderDelegate()
    .wrapAttributeEvents()
    .bindInputs()
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
