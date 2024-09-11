import System from '../../System.js';
import EventEmitter from '../event-emitter/EventEmitter.js';


export default class Application extends HTMLElement {
  #system;
  pipe;
  templates = new Map();

  constructor() {
    super();
    this.#system = new System(this);
    this.pipe = new EventEmitter();

  }

  async connectedCallback() {

    await this.#system.fetchTemplate();

    this.#system
    .normalizeTemplate()
    .setContextFromString()
    .attachEatingShadow()
    .adoptCss()
    .unfurlTemplate()
    .clearContent()
    .renderDelegate() // root subscription in application does not change
    .log('Application Ready!')

  }

  disconnectedCallback() {
    this.#system
    .removeSubscription();
  }



}
