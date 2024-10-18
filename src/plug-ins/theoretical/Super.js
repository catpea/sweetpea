import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';
import AutomaticTransmission from 'automatic-transmission';

export default class Super extends Theoretical {
  initialFace = '.card.front';
  machine;

  constructor(host) {
    super(host);

    const gearbox = {
      '/idle':{
        enter: () => this.attachShadow().adoptCss().createElementPipe()
      },
      '/connected':{
        enter: async () => await this.macro.installActorTemplate.installActorCSS.installActorView.installTemplate.wrapAttributeEvents.useExtensions.dispatchReady.run()
      },
      '/connected/front': {
        enter: () => this.skipTo(this.initialFace)
      },
      '/connected/front/danger': {
        enter: () => this.uiContext('.danger')
      },
      '/connected/settings': {
        enter: () => this.flipTo('.card.settings')
      },
      '/connected/worker': {
        enter: () => this.flipTo('.card.worker')
      },
      '/disconnected':{
        enter: () => this.collectGarbage(),
      },
      '/error':{
        enter: () => this.flipTo('.card.error')
      },
    }
    this.transmission = new AutomaticTransmission(gearbox, '/idle');

    // const states = {
    //   idle: {
    //     enter: () => this.attachShadow().adoptCss().createElementPipe()
    //   },
    //
    //   error: {
    //     enter: () => console.log('Entering Error state'),
    //      exit: () => console.log('Exiting Error state'),
    //   },
    //
    //   connected: {
    //     enter: async () => await this.macro
    //     .installActorTemplate
    //     .installActorCSS
    //     .installActorView
    //     .installTemplate
    //     .wrapAttributeEvents
    //     .useExtensions
    //     .dispatchReady
    //     .initializeUI
    //     .run()
    //   },
    //   disconnected: {
    //     enter: () => this.collectGarbage(),
    //   },
    //
    //   // UI States
    //   front:{
    //     enter: () => this.flipTo('.card.primary')
    //   },
    //   settings:{
    //     enter: () => this.flipTo('.card.settings')
    //   },
    //   worker:{
    //     enter: () => this.flipTo('.card.worker')
    //   },
    // };
    //
    //
    //
    // this.machine = new StateMachine(states, 'idle');
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
