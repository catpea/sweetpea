import Valve from './Valve.js';

export default class ValveElement extends HTMLElement {
  instance;

  static async load() {
  }

  constructor() {
    super();
    this.instance = new Valve(this);
  }
  connectedCallback() {
    this.instance.machine.transition('connected');
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

}
