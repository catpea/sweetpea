export default Inheritance => class ElementView extends Inheritance {

  #scripts = [];
  viewClass;

  readAndDestroyScript(){
    const scripts = this.template.querySelectorAll('script');
     for (const child of this.template.children) {
       if(child.tagName == 'SCRIPT'){
         const scriptContent = child.textContent;
         this.#scripts.push(scriptContent);
         child.remove()
       }
     }
    return this;
  }

  instantiateView(){
    this.viewClass = new this.View({core: this});
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

  triggerViewMount(){

    if('mount' in this.viewClass) this.viewClass.mount();

    this.subscriptions.push({type:'view-class/destroy', id:'view-class', subscription:()=>this.viewClass?.destroy()});
    
    return this;

  }


}
