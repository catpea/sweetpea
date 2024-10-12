export default Inheritance => class ElementEvents extends Inheritance {
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

  wrapAttributeEvents(){

    const classContext = {
      core: this,
      root: this.getStage().pipe,
      pipe: this.pipe,
      data: this.host.dataset,
    };
    //
    // if(this.View){
    //   // this is the embeded script's class
    //   const strContextClass = `${this.#scripts[0]}\n return new Main(this);`;
    //   this.viewClass = new Function(strContextClass).call(classContext); // new Main(classContext)
    // }else{
    //   class Main1 {
    //     root;
    //     constructor({root}){
    //       this.root = root;
    //     }
    //     mount(){
    //     }
    //     destroy(){
    //     }
    //     say(el){
    //       console.info('Hello from', el);
    //     }
    //   }
    //   this.viewClass = new Main1(classContext); // new Main(classContext)
    // }
    if(this.View){
      this.viewClass = new this.View(classContext); // new Main(classContext)
    }else{
      class View {
        root;
        constructor({root}){
          this.root = root;
        }
        mount(){
        }
        destroy(){
        }
        say(el){
          console.info('Hello from', el);
        }
      }
      this.viewClass = new View(classContext); // new Main(classContext)
    }


    const supportedEvents = ['click'];
    for (const name of supportedEvents) {
      const attributeQuery = `[on${name}]`
      const attributeName = `on${name}`
      const matches = this.host.shadowRoot.querySelectorAll(attributeQuery);
      matches.forEach(match => {
        // get attribute code and remove attribute
        const code = match.getAttribute(attributeName);
        match.removeAttribute(attributeName);
        // add a manual listener
        match.addEventListener(name, ()=>{
          // console.log(`TRIGGERED ${name}`, code);
          const codeFunction = new Function(`return ${code}`);
          // execute attribute code in context of class + retrieve user funcion (if any)
          const userFuncion = codeFunction.call(this.viewClass);
          // execute user funcion
          if (userFuncion instanceof Function) userFuncion(match, this);
        });
      });
    } // supportedEvents

    if('mount' in this.viewClass) this.viewClass.mount();
    this.subscriptions.push({type:'view-class/destroy', id:'view-class', subscription:()=>this.viewClass?.destroy()});

    return this;
  }


}
