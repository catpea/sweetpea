import Stage from './Stage.js';
import EventEmitter from 'event-emitter';


export default class StageElement extends HTMLElement {
  instance;

  static async load() {
  }

  constructor() {
    super();
    this.instance = new Stage(this);
    //console.log('THIS', this);

  }
  connectedCallback() {
    this.instance.machine.transition('connected');
  }
  disconnectedCallback() {
    this.instance.machine.transition('disconnected');
  }

  get actor(){
    if(!this.instance.actor) this.instance.actor = new EventEmitter();
    return this.instance.actor;
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
