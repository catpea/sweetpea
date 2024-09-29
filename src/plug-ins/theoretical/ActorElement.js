import Actor from './Actor.js';

export default class ActorElement extends HTMLElement {
  instance;

  constructor() {
    super();
    this.instance = new Actor(this);
  }
  connectedCallback() {
    this.instance.machine.transition('connected');
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

  get pipe(){
    return this.instance.pipe
  }

}
