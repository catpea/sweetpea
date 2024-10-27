import Stage from './Stage.js';

export default class StageElement extends HTMLElement {
  instance;

  static async load() {
  }

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

  // get on(){
  //   return this.instance.actor.on
  // }

  get actor(){
    return this.instance.actor
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
