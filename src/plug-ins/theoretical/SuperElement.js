import Super from './Super.js';

export default class SuperElement extends HTMLElement {

  instance;

  static async load() {
  }

  static get observedAttributes() {
    return ['x', 'y', 'supervisor', 'worker', 'selected'];
  }

  constructor() {
    super();
    this.instance = new Super(this);
  }

  connectedCallback() {
    this.instance.transmission.shift('/connected/front');
    this.updatePosition(); // Init
  }

  disconnectedCallback() {
    this.instance.transmission.shift('/disconnected');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const attributeHandlers = {
      'x y': () => this.updatePosition(),
      'selected': () => this.instance.selected.set(newValue==="true"?true:false),
      'worker': () => this.instance.worker.set(newValue),
    };

    if (oldValue == newValue) return;

    for (const [key, handler] of Object.entries(attributeHandlers)) {
      const attrs = key.split(' ');
      const match = attrs.includes(name);
      if(match) handler();
    }

  }

  updatePosition() {
    const style = {};
    const x = this.getAttribute('x') || '0';
    const y = this.getAttribute('y') || '0';
    Object.assign(style, {left: `${x}px`, top: `${y}px`,});
    this.addEventListener('ready', (event) => {
      const movable = this.shadowRoot.querySelector('.movable');
      if (movable) {
        Object.assign(movable.style, style);
      }
    })
  }

  get actor(){
    return this.instance.actor
  }

  get state(){
    return this.instance.state
  }

  get MutationObserver(){
    return MutationObserver;
  }
}
