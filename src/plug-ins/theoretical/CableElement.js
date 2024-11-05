import Cable from './Cable.js';

export default class CableElement extends HTMLElement {
  instance;

  static async load() {
  }

  static get observedAttributes() {
    return ['selected', 'debug'];
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

  attributeChangedCallback(name, oldValue, newValue) {
    const attributeHandlers = {
      'selected': () => this.instance.selected.set(newValue==="true"?true:false),
      'debug': () => this.instance.debug.set(newValue==="true"?true:false),
    };

    if (oldValue == newValue) return;
    for (const [key, handler] of Object.entries(attributeHandlers)) {
      const attrs = key.split(' ');
      const hasChanged = attrs.includes(name);
      if(hasChanged) handler();
    }

  }

  get id(){
    return this.getAttribute('id');
  }

}
