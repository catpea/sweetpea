export default Inheritance => class ElementView extends Inheritance {

  viewClass;

  // #scripts = [];
  // readAndDestroyScript(){
  //   const scripts = this.template.querySelectorAll('script');
  //    for (const child of this.template.children) {
  //      if(child.tagName == 'SCRIPT'){
  //        const scriptContent = child.textContent;
  //        this.#scripts.push(scriptContent);
  //        child.remove()
  //      }
  //    }
  //   return this;
  // }

  // liveQueueStats(selector="[data-slot=queue-count]"){
  //   const merged = signalMerge({ count: this.queue.count, total: this.queue.total }, this.subscriptions);
  //   const subscription = merged.subscribe(o=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.innerHTML = interpolate(el.dataset.template, o)))
  //   // merged.subscribe(o=> console.log('CCC merged', o ))
  //   this.subscriptions.push( {type:'signal-merge', id:selector, subscription} );
  //   return this;
  // }

  instantiateView(){
    this.viewClass = new this.View({core: this});
    return this;
  }

  renderViewSlots(){
    this.gc = this.workerPath.subscribe(v => this.host.shadowRoot.querySelectorAll('[data-slot=worker-path]').forEach(el=>el.innerHTML = v));
    return this;
  }

  connectEventsToView(){

    const supportedEvents = ['click', 'dblclick'];

    for (const name of supportedEvents) {
      const attributeQuery = `[on${name}]`
      const attributeName = `on${name}`
      const matches = this.host.shadowRoot.querySelectorAll(attributeQuery);

      matches.forEach(match => {
        // get attribute code and remove attribute
        const code = match.getAttribute(attributeName);
        match.removeAttribute(attributeName);

        const payload = event => {
          // console.log(`TRIGGERED ${name}`, code);
          const codeFunction = new Function(`return ${code}`);
          // execute attribute code in context of class + retrieve user funcion (if any)
          const userFuncion = codeFunction.call(this.viewClass);
          // execute user funcion
          if (userFuncion instanceof Function) userFuncion(event, match, this);
        }
        // add a manual listener
        match.addEventListener(name, payload);
        this.subscriptions.push({type:'supportedEvents', id:'...', subscription:()=>match.removeEventListener(name, payload) });

      });
    } // supportedEvents

    return this;
  }


  async triggerViewMount(){
    if('mount' in this.viewClass) await this.viewClass.mount();
    this.subscriptions.push({type:'view-class/destroy', id:'view-class', subscription:()=>this.viewClass?.destroy()});
    return this;
  }


}
