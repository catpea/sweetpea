import Theoretical from './Theoretical.js';
import AutomaticTransmission from 'automatic-transmission';

export default class Super extends Theoretical {
  initialFace = '.card.front';
  machine;

  constructor(host) {
    super(host);

    const gearbox = {
      '/idle':{
        enter: () => this.attachShadow().adoptCss()
      },
      '/connected':{
        enter: async () => await this.macro
        .awaitStageReady
        .createWorker // NOTE: requres connection to parent

        .installSupervisorTemplate
        .installSupervisorCSS
        .installSupervisorView

        .installTemplate
        .instantiateView
        .renderViewSlots

        .connectEventsToView
        .triggerViewMount
        .useExtensions

        .activateInputPort
        .activateOutputPort

        .renderViewParameters

        .liveQueueStats
        .liveBufferStats
        .deactivateIO

        .installWorkerIndex
        .listWorkerCategories
        .listCategoryWorkers

        .installVisualSelectionIndicator
        .dispatchReady
        .showUI
        .run()

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


  showUI() {
    this.host.shadowRoot.firstChild.classList.remove('d-none')
  }


}
