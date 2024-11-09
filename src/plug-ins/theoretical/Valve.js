import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Valve extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this.attachShadow().adoptCss(),
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
        enter: async () => await this.macro
          .getValveTemplate
          .installTemplate
          .bindDoubleCurly
          .useExtensions
          .run()
       },
       disconnected: {
        enter: () => this.collectGarbage(),
          exit: () => console.log('Exiting disconnected'),
       },
    };
    this.machine = new StateMachine(states, 'idle');
  }

  async getValveTemplate() {
    this.template = this.getStage().instance.theme.template('cable-valve');

  }

}
