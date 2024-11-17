import interpolate from 'interpolate';
import location from 'location';
import Signal from 'signal';


import signalMerge from 'signal-merge';

export default Inheritance => class WorkerSupport extends Inheritance {

  workerIndex = new Signal();

  workerCategory = new Signal();
  workerType = new Signal();

  workerPath = new Signal();
  WorkerClass = new Signal();
  workerInstance = new Signal();

  async createWorker(){


    this.gc = this.workerCategory.subscribe(async workerCategory => {
      const category = workerCategory;
      const type = this.workerType.value;
      if(category && type) this.workerPath.value = `${category}/${type}`
    });

    this.gc = this.workerType.subscribe(async workerType=>{
      const category = this.workerCategory.value;
      const type = workerType;
      if(category && type) this.workerPath.value = `${category}/${type}`
    });

    this.gc = this.workerPath.subscribe(async workerPath=>this.WorkerClass.set((await import(`${location(window.location.href)}/src/worker/${workerPath}/index.js`)).default));
    this.gc = this.workerPath.subscribe(async workerPath => {
      if (this.host.getAttribute('worker') !== workerPath) {
        this.host.setAttribute('worker', workerPath);
      }
    });

    this.gc = this.WorkerClass.subscribe(async WorkerClass => {
      if (this.workerInstance.value) {
        await this.workerInstance.value.disconnect();
        await this.workerInstance.value.disconnected();
        await this.workerInstance.value.destroy();
        // console.log( this.workerInstance.value );
      }
      this.workerInstance.value = new WorkerClass({ id:this.host.id, queue: this.queue, buffer: this.buffer, stage: this.getStage().emitter, data: this.data, cables:this.cables })
    })

    this.gc = this.workerInstance.subscribe(async workerInstance=>{
     await workerInstance.connect();
     await workerInstance.connected()
    });

    this.gc = ()=>this.workerInstance.value.disconnect(); // .gc will clean up on removal of element
    this.gc = ()=>this.workerInstance.value.disconnected(); // .gc will clean up on removal of element
    this.gc = ()=>this.workerInstance.value.destroy(); // .gc will clean up on removal of element

    await new Promise(resolve=>this.gc=this.workerInstance.subscribe(v=>Boolean(v)?resolve():null));
    return this;

  }


  async installWorkerIndex() {
    const environment = new Set();

    if(globalThis.process && globalThis.process?.versions?.nw) environment.add('NW.js')

    const data = await this.fetchJSON('src/worker/index.json');

    for (const category of data.categories) {

      category.blocks = category.blocks.filter(block=>block.engine?!!environment.intersection(new Set(block.engine)).size:true)


    }

    this.workerIndex.value = data;
    return this;
  }



  listWorkerCategories() {
    const selector = '[data-slot="category-list"]';
    this.gc = this.workerIndex.subscribe(workerIndex => this.host.shadowRoot.querySelectorAll(selector).forEach(containerNode => {
      // prepare state of co-dependent dropdown
      this.host.shadowRoot.querySelectorAll('[data-slot="worker-list"]').forEach(containerNode => { containerNode.replaceChildren(); containerNode.disabled = true })

      const changeHandler = event => {
        if (event.target.value == "--label--") return;
        this.workerType.value = null;
        this.workerCategory.value = event.target.value;
        const description = event.target[event.target.selectedIndex].dataset.description;
        this.host.shadowRoot.querySelectorAll('[data-slot="description"]').forEach(el => { el.replaceChildren(description); })

      };

      containerNode.addEventListener('change', changeHandler);
      this.gc = ()=>containerNode.removeEventListener('change', changeHandler);

      containerNode.replaceChildren();
      {
        const optionNode = document.createElement("option");
        optionNode.append('Select Category:');
        optionNode.value = "--label--";
        containerNode.appendChild(optionNode);
      }
      for (const category of workerIndex.categories) {
        const optionNode = document.createElement("option");
        optionNode.value = category.id;
        optionNode.dataset.description = category.description;
        optionNode.append(category.name);
        containerNode.appendChild(optionNode);
      }
      this.gc = this.workerCategory.subscribe(v=>containerNode.value=v||"--label--")

    }))

  }

  listCategoryWorkers() {
    const selector = '[data-slot="worker-list"]';
    this.gc = this.workerCategory.subscribe(workerCategory => this.host.shadowRoot.querySelectorAll(selector).forEach(containerNode => {

      const changeHandler = event => {
        if (event.target.value == "--label--") return;

        this.workerType.value = event.target.value;
        const description = event.target[event.target.selectedIndex].dataset.description;
        this.host.shadowRoot.querySelectorAll('[data-slot="description"]').forEach(el => { el.replaceChildren(description); })
      };

      containerNode.addEventListener('change', changeHandler);
      this.gc = () => containerNode.removeEventListener('change', changeHandler);
      containerNode.disabled = false;
      containerNode.replaceChildren();
      {
        const optionNode = document.createElement("option");
        optionNode.value = "--label--";
        optionNode.append('Select Type:');
        containerNode.appendChild(optionNode);
      }
      const category = this.workerIndex.value.categories.find(o => o.id === workerCategory);
      for (const block of category.blocks) {
        const optionNode = document.createElement("option");
        optionNode.value = block.id;
        // optionNode.dataset.path = block.path;
        optionNode.dataset.description = block.description;
        optionNode.append(block.name);
        containerNode.appendChild(optionNode);
      }
      this.gc = this.workerType.subscribe(v=>containerNode.value=v||"--label--")
      // select
    }));
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
      this.gc = workerInstance.parameters.subscribe(parameters=>this.renderParameters(parameters));
    });
    return this;
  }


  renderParameters(parameters){

    const parametersSlot  = this.host.shadowRoot.querySelector('[data-slot=parameters]');
    const existingParameters = new Set(parameters.map(v => v.value.name));

    for (const child of parametersSlot.children) {
      if (existingParameters.has(child.id)) {
        // child exists
      }else{
        // child removed
       //console.log('REMOVING', child, child.id);
        parametersSlot.removeChild(child);
      }
    }

    for (const $parameter of parameters) {
      const parameter = $parameter.value;
      if(!this.data[parameter.name].value) this.data[parameter.name].value = parameter.defaultValue; // Initialize Defau;t Value

      const type =  $parameter.constructor.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase().replace(/-parameter$/,'');
      const label = parameter.name.replace(/([A-Z])/,' $1').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

      if (type === 'port') continue; // taken care of
      if (this.host.shadowRoot.getElementById(parameter.name)) continue; // already exists

      const contentNode = this.getStage().instance.theme.template('worker-parameters');
      const typeNode = this.getStage().instance.theme.template(`worker-parameters-${type}`);

      contentNode.firstChild.id = parameter.name;

      if (type == 'enum') {
        typeNode.querySelectorAll('[data-slot="option-list"]').forEach(containerNode => {
          const changeHandler = event => {
            this.data[parameter.name].value = event.target.value;
          };
          containerNode.addEventListener('change', changeHandler);
          this.gc = () => containerNode.removeEventListener('change', changeHandler);

          for( const option of parameter.enumeratedMembers ){
            const optionNode = document.createElement("option");
            optionNode.value = option.value;
            optionNode.selected = option.selected;
            optionNode.append(option.name);
            containerNode.appendChild(optionNode);
          }

          // If the datastore has no value, find the default.
          const unknownValue = !this.data[parameter.name].value;
          if (unknownValue) {
            const selection = parameter.enumeratedMembers.find(o => o.selected);
            if(selection) this.data[parameter.name].value = selection.value;
          }

          // When datastore changes, use the value from the data store
          this.gc = this.data[parameter.name].subscribe(v=>containerNode.value=v)


        });
      }



      contentNode.querySelector('[data-slot=type]').appendChild(typeNode);

      // WorkerSupport binding of bindings
      const boundElements = contentNode.querySelectorAll('[data-bind]');

      // template has been rendered, now apply any bindings
      for (const boundElement of boundElements) {
        const multiBind = boundElement.dataset.bind.split(',').map(o=>o.trim());
        for (const bound of multiBind) {
          let [parameterName, targetAttribute] = bound.split('@')
          if (!parameterName) parameterName = targetAttribute;
          const parameterValue = parameter[parameterName];

          if (targetAttribute) {
            // apply to attribute
            if (targetAttribute == 'value') {
              // special case, bidirectional binding becasue targetAttribute is value
              const updateValue = () => this.data[parameter.name].value = boundElement.value; boundElement.addEventListener('input', updateValue); this.gc = () => boundElement.removeEventListener('input', updateValue);
              this.gc = this.data[parameter.name].subscribe(v => boundElement.value = v);
            }else{
              // update attribute when parameter changes, this could be input type for example
              boundElement.setAttribute(targetAttribute, boundElement.dataset.bindTemplate?interpolate(boundElement.dataset.bindTemplate, {[parameterName]:parameterValue}):parameterValue);
            }

          }else{
            boundElement.innerText = (boundElement.dataset.bindTemplate?interpolate(boundElement.dataset.bindTemplate, {[parameterName]:parameterValue}):parameterValue)
          }
        } // multibind
      } // for boundElements





      parametersSlot.appendChild(contentNode);

    }
  } // fun render

}
