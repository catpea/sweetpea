import interpolate from 'interpolate';
import location from 'location';
import Signal from 'signal';


import signalMerge from 'signal-merge';

export default Inheritance => class WorkerSupport extends Inheritance {

  workerPath = new Signal();
  WorkerClass = new Signal();
  workerInstance = new Signal();

  async createWorker(){
    this.gc = this.workerPath.subscribe(async workerPath=>this.WorkerClass.set((await import(`${location(window.location.href)}/src/worker/${workerPath}/index.js`)).default));
    this.gc = this.WorkerClass.subscribe(WorkerClass=>this.workerInstance.value = new WorkerClass({queue:this.queue, buffer:this.buffer, stage:this.getStage().emitter, data:this.data}) )
    this.gc = this.workerInstance.subscribe(async workerInstance=>{ await workerInstance.connect(); await workerInstance.connected() });
    this.gc = ()=>this.workerInstance.value.disconnected(); // .gc will clean up on removeal of element
    await new Promise(resolve=>this.gc=this.workerInstance.subscribe(v=>Boolean(v)?resolve():null));
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
      // console.dir(parameter);
      if (parameter.type === 'port') { // taken care of
        continue;
      }

      const contentNode = this.getStage().instance.theme.template('worker-parameters');
      const typeNode = this.getStage().instance.theme.template(`worker-parameters-${parameter.type}`);

      contentNode.querySelector('[data-slot=type]').appendChild(typeNode);

      // WorkerSupport binding of bindings
      const boundElements = contentNode.querySelectorAll('[data-bind]');
      for (const boundElement of boundElements) {

        //NOTE: split
        const [name, attribute] = boundElement.dataset.bind.split('@');
        const value = parameter[name]

        switch (boundElement.tagName) {
          case 'INPUT':
          if(!this.data[parameter.name].value) this.data[parameter.name].value = parameter.defaultValue; // Initialize signal value (upsert)
            // boundElement.value = this.data[name].value; // Initialize valeu of input element

            // listen to input element
            const updateValue = () => this.data[parameter.name].value = boundElement.value;
            // const updateValue = () => { console.log(`Update ${name} value "${this.data[name].value}" with bound element value "${boundElement.value}"`) }
            boundElement.addEventListener('input', updateValue);
            this.gc = () => boundElement.removeEventListener('input', updateValue);
            this.gc = this.data[parameter.name].subscribe(v => boundElement.value = v);

          case 'B':
            ////console.log('B');
          default:
            if(attribute){
              const template = boundElement.dataset.bindTemplate;
              if(template){
                //console.warn('TODO: template literals htmlz`` ');
                const data = {[name]:value};
                const result = interpolate(template, data);
                ////console.log('OOO', {attribute, data, result, template});
                boundElement.setAttribute(attribute, result);

              }else{
                boundElement.setAttribute(attribute, value);
              }
            }else{
              boundElement.innerText = value;
            }
        } // switch
      } // for





      parametersSlot.appendChild(contentNode);

    }
  } // fun render

}
