import Actor from './Actor.js';

export default class ActorElement extends HTMLElement{
  instance;

  static get observedAttributes() {
    return ['x', 'y'];
  }

  constructor() {
    super();
    this.instance = new Actor(this);
  }
  connectedCallback() {
    this.instance.machine.transition('connected');
    this.updatePosition();
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updatePosition();
    }
  }

  updatePosition() {
    const x = this.getAttribute('x') || '0';
    const y = this.getAttribute('y') || '0';
    const movable = this.shadowRoot.querySelector('.movable');
    if (movable) {
      movable.style.left = `${x}px`;
      movable.style.top = `${y}px`;
    }
  }

  get pipe(){
    return this.instance.pipe
  }





}
