import Signal from 'signal';
import location from 'location';

// import location from 'location';
// import masticator from 'masticator';
// import EventEmittter from 'event-emitter';
// import Signal from 'signal';
// import Signal from 'signal';
// import cloneDeep from 'cloneDeep';
// import location from 'location';
import interpolate from 'interpolate';


import signalMerge from 'signal-merge';

export default Inheritance => class WorkerSupport extends Inheritance {

  workerPath = new Signal();
  WorkerClass = new Signal();
  workerInstance = new Signal();

  async createWorker({attribute}={attribute:"worker"}){
    this.gc = this.workerPath.subscribe(async workerPath=>this.WorkerClass.set((await import(`${location(window.location.href)}/src/worker/${workerPath}/index.js`)).default));
    this.gc = this.workerPath.subscribe(workerPath=>console.log({workerPath}))
    this.gc = this.WorkerClass.subscribe(WorkerClass=>console.log({WorkerClass}))
    this.gc = this.workerInstance.subscribe(workerInstance=>console.log({workerInstance}))
    this.gc = this.WorkerClass.subscribe(WorkerClass=>this.workerInstance.value = new WorkerClass(this.getStage().emitter) )
    this.gc = this.workerInstance.subscribe(async workerInstance=>{ await workerInstance.connected(); await workerInstance.connected() });
    this.gc = ()=>this.workerInstance.value.disconnected(); // .gc will clean up on removeal of element
    return this;
  }

  activateInputPort(selector = `[data-feature="standard-input"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{
      this.gc = workerInstance.input.subscribe(v=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = v.showPort?'block':'none'))
    })
    return this;
  }

  activateOutputPort(selector = `[data-feature="standard-output"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{
      this.gc = workerInstance.output.subscribe(v=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = v.showPort?'block':'none'))
    })
    return this;
  }

  deactivateIO(selector = `[data-feature="standard-io"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{
    const merged = signalMerge({ input: workerInstance.input, output: workerInstance.output }, this.subscriptions);
    const subscription = merged.subscribe(o=>{
      const bothInActive = o.input.showPort===false&&o.output.showPort===false;
      this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = bothInActive?'none':'block');
    })
    this.subscriptions.push( {type:'signal-merge', id:selector, subscription} );
    })

    return this;
  }

  renderViewParameters(){
    this.gc = this.workerInstance.subscribe(workerInstance=>{ // once worker instance becomes available
      this.renderParameters(workerInstance.parameters);
    });

    return this;
  }


  renderParameters(parameters){

    // const template = this.getStage().instance.theme.querySelector('template[id=worker-parameters]');
    const parametersSlot  = this.host.shadowRoot.querySelector('[data-slot=parameters]');
    parametersSlot.replaceChildren(); // clear element


    for (const parameter of parameters) {
      console.dir(parameter);
      if (parameter.type === 'port') { // taken care of
        continue;
      }

      const contentNode = this.getStage().instance.theme.template('worker-parameters');
      const typeNode = this.getStage().instance.theme.template(`worker-parameters-${parameter.type}`);

      console.log('PPP', contentNode);
      contentNode.querySelector('[data-slot=type]').appendChild(typeNode);

      // WorkerSupport binding of bindings
      const bindings = contentNode.querySelectorAll('[data-bind]');
      for (const binding of bindings) {
        const [name, attribute] = binding.dataset.bind.split('@');
        const value = parameter[name]
        ////console.log('OOO', name, value);
        switch (binding.tagName) {
          case 'INPUT':
            binding.value = value?.subscribe?value.get():value;
          case 'B':
            ////console.log('B');
          default:
            if(attribute){
              const template = binding.dataset.bindTemplate;
              if(template){
                //console.warn('TODO: template literals htmlz`` ');
                const data = {[name]:value};
                const result = interpolate(template, data);
                ////console.log('OOO', {attribute, data, result, template});
                binding.setAttribute(attribute, result);

              }else{
                binding.setAttribute(attribute, value);
              }
            }else{
              binding.innerText = value;
            }
        } // switch
      } // for





      parametersSlot.appendChild(contentNode);

    }
  } // fun render

}
