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
        enter: async () => await this.macro.installSupervisorTemplate.installSupervisorCSS.installSupervisorView.installTemplate.wrapAttributeEvents.useExtensions.installVisualSelectionIndicator.configurePrintComponent.dispatchReady.run()
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

  installVisualSelectionIndicator(){
    const subscription = this.selected.subscribe(selected=>{
      if(selected){
        const container = this.searchShadow('.perspective').pop();
        for (const element of container.querySelectorAll('.card')) {
          element.classList.add('selected');
        }
      }else{
        const container = this.searchShadow('.perspective').pop();
        for (const element of container.querySelectorAll('.card')) {
          element.classList.remove('selected');
        }
      }
    });
    this.subscriptions.push( {type:'svg/line', id:'cable', subscription} );
    return this;

  }

  configurePrintComponent(){
    const matches = this.host.shadowRoot.querySelectorAll(`${globalThis.sweetpea.prefix}-print`);
    matches.forEach(match => {
      console.error('SEND DATA TO PRINT!!!');
      // const trash1 = match.state.subscribe(state=>{
      //
      //   // if(state === 'ready'){
      //     console.log('OOO ready');
      //     const templateName = match.getAttribute('template');
      //     const signalName = match.getAttribute('signal');
      //     const template = this.host.shadowRoot.getElementById(templateName);
      //     match.instance.externalTemplate.set( template.content.cloneNode(true) );
      //     match.instance.externalData.set( this.viewClass[signalName] );
      //     //
      //     // console.log('OOO', templateName, signalName);
      //     console.log('OOO template', match.instance.template);
      //     console.log('OOO signal', match.instance.signal);
      //
      //   // }
      //
      // })

    })
  }

}
