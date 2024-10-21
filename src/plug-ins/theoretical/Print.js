import Signal from 'signal';

import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Print extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this.attachShadow().adoptCss(),
        // exit: () => this
        //   .log('Exiting Idle state'),
      },
      loading: {
        // enter: () => console.log('Entering Loading state'),
        //  exit: () => console.log('Exiting Loading state'),
      },
      error: {
        // enter: () => console.log('Entering Error state'),
        //  exit: () => console.log('Exiting Error state'),
      },
      connected: {
        enter: () => this
          // .getTemplateElement()
          .dispatchReady()
          .printSomething()
          // .getTemplate({selector: '#'+this.constructor.name.toLowerCase()})
          // .installTemplate()
          // .bindDoubleCurly()
          // .useExtensions(),

         // exit: () => console.log('Exiting Connected state'),
       },
       disconnected: {
        enter: () => this.collectGarbage(),
          exit: () => console.log('Exiting disconnected'),
       },
    };
    this.machine = new StateMachine(states, 'idle');
  }

  getTemplateElement({attribute}={attribute:'template'}){

    const id = this.host.getAttribute(attribute);
    console.log({id});
    const template = this.host.shadowRoot.getElementById(id);
    console.log(this.host.shadowRoot);
    console.log({template});

    this.template = template.content.cloneNode(true);
    console.log(`${this.host.tagName} installed template:`, this.template);
    return this;
  }

  externalTemplate = new Signal();
  externalData = new Signal();

    printSomething(){

      console.error('Consume externalTemplate and externalData, use a buffer(2) pipe');

    // let template;
    // let data = {};
    //
    // const render = () => {
    //   console.log('XXX LOL!');
    //
    //   if(template) {
    //     this.host.shadowRoot.append(template);
    //   }
    //   const boundElements = this.host.shadowRoot.querySelectorAll('[data-bind]');
    //   console.log('XXX boundElements', boundElements);
    //   console.log('XXX data', data.get());
    //
    //
    //    boundElements.forEach(element => {
    //      const bindKey = element.getAttribute('data-bind');
    //      if (data.get()[bindKey] !== undefined) {
    //        element.innerText = context[bindKey];
    //      }
    //    });
    //
    // }
    //
    // this.externalTemplate.subscribe(v=>{
    //   template=v;
    //   render()
    // })
    // this.externalData.subscribe(v=>{
    //   data=v;
    //   render()
    // })


    return this;

  }


}
