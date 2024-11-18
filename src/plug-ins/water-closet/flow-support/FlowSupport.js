import interpolate from 'interpolate';
import location from 'location';
import Signal from 'signal';


import signalMerge from 'signal-merge';

export default Inheritance => class FlowSupport extends Inheritance {

  flowIndex = new Signal();
  flowCategory = new Signal();
  flowType = new Signal();

  flowPath = new Signal();
  FlowClass = new Signal();
  flowInstance = new Signal();

  async createFlow(){

    this.gc = this.flowCategory.subscribe(async flowCategory => {
      const category = flowCategory;
      const type = this.flowType.value;
      if(category && type) this.flowPath.value = `${category}/${type}`
    });

    this.gc = this.flowType.subscribe(async flowType=>{
      const category = this.flowCategory.value;
      const type = flowType;
      if(category && type) this.flowPath.value = `${category}/${type}`
    });

    this.gc = this.flowPath.subscribe(async flowPath=>this.FlowClass.value = (await import(`${location(window.location.href)}/src/flow/${flowPath}/index.js`)).default);

    this.gc = this.flowPath.subscribe(async flowPath => {
      if (this.host.getAttribute('flow') !== flowPath) {
        this.host.setAttribute('flow', flowPath);
      }
    });

    this.gc = this.FlowClass.subscribe(async FlowClass => {
      if (this.flowInstance.value) await this.flowInstance.value.disconnect(); // disconnect previous - as we are instantiating a new one
      const options = {
        id: this.host.id,
        queue: this.queue,
        buffer: this.buffer,
        stage: this.getStage().emitter,
        data: this.data,
        cables: this.cables,
        worker: this.workerInstance.value, // calss that has function to execute
        actor: this.actor, // bus
      };
      const flow = new FlowClass(options);
      this.gc = this.workerInstance.subscribe(v => flow.worker = v);
      this.flowInstance.value = flow;
    })

    this.gc = this.flowInstance.subscribe(async flowInstance=>{
     await flowInstance.connect();
    });

    this.gc = ()=>this.flowInstance.value.disconnect(); // .gc will clean up on removal of element

    // await new Promise(resolve=>this.gc=this.flowInstance.subscribe(v=>Boolean(v)?resolve():null));
    return this;

  }


  async installFlowIndex() {
    this.flowIndex.value = await this.fetchJSON('src/flow/index.json');
  }



  listFlowCategories() {
    const selector = '[data-slot="flow-category-list"]';
    this.gc = this.flowIndex.subscribe(flowIndex => this.host.shadowRoot.querySelectorAll(selector).forEach(containerNode => {
      // prepare state of co-dependent dropdown
      this.host.shadowRoot.querySelectorAll('[data-slot="flow-list"]').forEach(containerNode => { containerNode.replaceChildren(); containerNode.disabled = true })

      const changeHandler = event => {
        if (event.target.value == "--label--") return;
        this.flowType.value = null;
        this.flowCategory.value = event.target.value;
        const description = event.target[event.target.selectedIndex].dataset.description;
        this.host.shadowRoot.querySelectorAll('[data-slot="description"]').forEach(el => { el.replaceChildren(description); })

      };

      containerNode.addEventListener('change', changeHandler);
      this.gc = ()=>containerNode.removeEventListener('change', changeHandler);

      containerNode.replaceChildren();
      {
        const optionNode = document.createElement("option");
        optionNode.append('Select Flow Category:');
        optionNode.value = "--label--";
        containerNode.appendChild(optionNode);
      }
      for (const category of flowIndex.categories) {
        const optionNode = document.createElement("option");
        optionNode.value = category.id;
        optionNode.dataset.description = category.description;
        optionNode.append(category.name);
        containerNode.appendChild(optionNode);
      }
      this.gc = this.flowCategory.subscribe(v=>containerNode.value=v||"--label--")

    }))

  }

  listFlowCategoryFlows() {
    const selector = '[data-slot="flow-list"]';
    this.gc = this.flowCategory.subscribe(flowCategory => this.host.shadowRoot.querySelectorAll(selector).forEach(containerNode => {

      const changeHandler = event => {
        if (event.target.value == "--label--") return;

        this.flowType.value = event.target.value;
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
        optionNode.append('Select Flow Strategy:');
        containerNode.appendChild(optionNode);
      }
      const category = this.flowIndex.value.categories.find(o => o.id === flowCategory);
      for (const block of category.blocks) {
        const optionNode = document.createElement("option");
        optionNode.value = block.id;
        // optionNode.dataset.path = block.path;
        optionNode.dataset.description = block.description;
        optionNode.append(block.name);
        containerNode.appendChild(optionNode);
      }
      this.gc = this.flowType.subscribe(v=>containerNode.value=v||"--label--")
      // select
    }));
  }






  renderFlowViewParameters(){
    this.gc = this.flowInstance.subscribe(flowInstance=>{ // once flow instance becomes available
      this.gc = flowInstance.parameters.subscribe(parameters=>this.#renderFlowParameters(parameters));
    });
    return this;
  }


  #renderFlowParameters(parameters){

    const parametersSlot  = this.host.shadowRoot.querySelector('[data-slot=flow-parameters]');
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

      const contentNode = this.getStage().instance.theme.template('flow-parameters');
      const typeNode = this.getStage().instance.theme.template(`flow-parameters-${type}`);

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

      // FlowSupport binding of bindings
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
