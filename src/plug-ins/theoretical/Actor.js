import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Actor extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this
          .log('Entering Idle state...')
          .attachShadow()
          .adoptCss()
          .createElementPipe()
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
          .readAndDestroyScript()
          .installTemplate()
          .wrapAttributeEvents()
          .useExtensions()
          .done,
         exit: () => console.log('Exiting Connected state'),
      },
    };
    this.machine = new StateMachine(states, 'idle');
  }



  //
  #svg;
  #line;
  #x1 = 0;
  #y1 = 0;
  #x2 = 256;
  #y2 = 256;
  #stroke = 'green';
  #strokeWidth = '2';

  locateSvg(){
    this.#svg = this.host.shadowRoot.host.closest('x-stage').shadowRoot.querySelector('svg');
    if(!this.#svg) throw new TypeError('Unable to locate SVG element');
    return this;
  }

  drawLine(){
    this.#line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.#line.setAttribute('x1', this.#x1);
    this.#line.setAttribute('y1', this.#y1);
    this.#line.setAttribute('x2', this.#x2);
    this.#line.setAttribute('y2', this.#y2);
    this.#line.setAttribute('stroke', this.#stroke);
    this.#line.setAttribute('stroke-width', this.#strokeWidth);
    this.#svg.appendChild(this.#line);
    return this;
  }

}
