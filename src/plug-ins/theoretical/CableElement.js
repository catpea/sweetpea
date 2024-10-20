import Cable from './Cable.js';

export default class CableElement extends HTMLElement {
  instance;

  static async load() {
  }

  constructor() {
    super();
    this.instance = new Cable(this);
  }
  connectedCallback() {
    this.instance.transmission.shift('/connected');
  }
  disconnectedCallback() {
    this.instance.transmission.shift('/disconnected');

  }

}
