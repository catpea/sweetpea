import Super from './Super.js';

export default class SuperElement extends HTMLElement{
  instance;

  static async load() {
  }

  static get observedAttributes() {
    return ['x', 'y'];
  }

  constructor() {
    super();
    this.instance = new Super(this);
  }
  connectedCallback() {
    this.instance.machine.transition('connected');
    this.updatePosition();
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');

  }

  attributeChangedCallback(name, oldValue, newValue) {

    console.log('attributeChangedCallback', name, oldValue, newValue);

    const attributeHandlers = {
      'x y': () => this.updatePosition(),
      // 'worker': () => this.instance.machine.transition('configure-worker'),
    };

    if (oldValue == newValue) return;
    for (const [key, handler] of Object.entries(attributeHandlers)) {
      const attrs = key.split(' ');
      const hasChanged = attrs.includes(name);
      if(hasChanged) handler();
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

  get pipe(){
    return this.instance.pipe
  }





}
