import Cable from './Cable.js';

export default class CableElement extends HTMLElement {
  instance;

  constructor() {
    super();
    this.instance = new Cable(this);
  }
  connectedCallback() {
    this.instance.machine.transition('connected');
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

}
