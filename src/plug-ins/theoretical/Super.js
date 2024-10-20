import Theoretical from './Theoretical.js';
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
        enter: () => this.skipTo(this.initialFace).dispatchIdle()
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

  }

}
