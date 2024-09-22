import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Stage extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this
          .log('Entering Idle state...')
          .attachShadow()
          .adoptCss()
          .log('Entered Idle state'),
        exit: () => this
          .log('Exiting Idle state'),
      },
      loading: {
        enter: () => console.log('Entering Loading state'),
         exit: () => console.log('Exiting Loading state'),
      },
      error: {
        enter: () => console.log('Entering Error state'),
         exit: () => console.log('Exiting Error state'),
      },
      connected: {
        enter: () => this
          .log('Entering Connected state')
          .getTemplate()
          .installTemplate()
          .installStageListeners(),
         exit: () => console.log('Exiting Connected state'),
      },
    };
    this.machine = new StateMachine(states, 'idle');
  }

  installStageListeners(){
    console.log(this);
    this.content = this.host.shadowRoot.querySelector('.content');

    this.host.addEventListener('mousedown',  this.#onMouseDown.bind(this));
    this.host.addEventListener('mousemove',  this.#onMouseMove.bind(this));
    this.host.addEventListener('mouseup',    this.#onMouseUp.bind(this));
    this.host.addEventListener('wheel',      this.#onWheel.bind(this), { passive: false });
    this.host.addEventListener('touchstart', this.#onTouchStart.bind(this));
    this.host.addEventListener('touchmove',  this.#onTouchMove.bind(this));
    this.host.addEventListener('touchend',   this.#onTouchEnd.bind(this));

  }


    // Reference
    content;

    // Public State
    pan = { x: 0, y: 0 };
    zoom = 1;

    // Protected
    #startPan = { x: 0, y: 0 };
    #startMousePos = { x: 0, y: 0 };
    #isPanning = false;

    // Public
    updateTransform() {
        this.content.style.transform = `translate(${this.pan.x}px, ${this.pan.y}px) scale(${this.zoom})`;
    }

    // Protected
    #onMouseDown(event) {
        this.#isPanning = true;
        this.#startMousePos = { x: event.clientX, y: event.clientY };
        this.#startPan = { ...this.pan };
        event.preventDefault();
    }

    #onMouseMove(event) {
      if (this.#isPanning) {
        this.pan.x = this.#startPan.x + (event.clientX - this.#startMousePos.x);
        this.pan.y = this.#startPan.y + (event.clientY - this.#startMousePos.y);
        this.updateTransform();
      }
    }

    #onMouseUp(event) {
      this.#isPanning = false;
    }

    #onWheel(event) {
      const deltaScale = event.deltaY > 0 ? 0.9 : 1.1;
      this.zoom *= deltaScale;

      const rect = this.host.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      this.pan.x = offsetX * (1 - deltaScale) + deltaScale * this.pan.x;
      this.pan.y = offsetY * (1 - deltaScale) + deltaScale * this.pan.y;

      this.updateTransform();
      event.preventDefault();
    }

    #onTouchStart(event) {
      if (event.touches.length === 1) {
        this.#isPanning = true;
        this.#startMousePos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        this.#startPan = { ...this.pan };
      }
      event.preventDefault();
    }

    #onTouchMove(event) {
      if (this.#isPanning && event.touches.length === 1) {
        this.pan.x = this.#startPan.x + (event.touches[0].clientX - this.#startMousePos.x);
        this.pan.y = this.#startPan.y + (event.touches[0].clientY - this.#startMousePos.y);
        this.updateTransform();
      }
    }

    #onTouchEnd(event) {
      this.#isPanning = false;
    }


}
