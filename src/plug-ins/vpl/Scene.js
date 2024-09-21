import System from './VplSystem.js';

export default class Scene extends HTMLElement {
  #system;

  constructor() {
    super();
    this.#system = new System(this);
    this.registry = new Map();
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
    .wrapAttributeEvents()
    .useExtensions()

  }

  disconnectedCallback() {
    if(this.#system.ready) this.#system
    .removeSubscription();
  }

  execute(fun){
    const customContext = { customName: 'Example' };
    console.log('Executing <3....', fun.apply(customContext)(this));
    return this;
  }

  get context(){
    return this.#system.retrieveContext()
  }
  set context(v){
    this.#system.updateContext(v);
  }

}
