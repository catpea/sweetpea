import Stage from './Stage.js';

export default class StageElement extends HTMLElement {
  instance;

  constructor() {
    super();
    this.instance = new Stage(this);
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

  get pan() {
      return this.instance.pan;
  }

  set pan(value) {
      this.instance.pan = value;
      this.instance.updateTransform();
  }

  get zoom() {
      return this.instance.zoom;
  }

  set zoom(value) {
      this.instance.zoom = value;
      this.instance.updateTransform();
  }

}
