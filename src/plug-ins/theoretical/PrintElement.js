import Print from './Print.js';

export default class PrintElement extends HTMLElement {

  instance;

  static async load() {
  }

  constructor() {
    super();
    this.instance = new Print(this);
  }

  connectedCallback() {
    this.instance.machine.transition('connected');
  }

  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

  get state(){
    return this.instance.state
  }
}
