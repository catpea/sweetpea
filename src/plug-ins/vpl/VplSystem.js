import System from '../../System.js';
import EventEmitter from '../event-emitter/EventEmitter.js';

export default class VplSystem extends System {

  #svg;

  #x1 = 10;
  #y1 = 10;
  #x2 = 20;
  #y2 = 10;

  #stroke = "black";
  #strokeWidth = 2;
  #line;

  #scripts = [];
  #pipe;

  locateSvg(){

    this.#svg = this.host.shadowRoot.host.parentNode.shadowRoot.querySelector('svg');

    // const doc = this.host.shadowRoot.host.parentNode;
    // const targetElement2 = doc.querySelector('');
    // const targetElement = targetElement2.shadowRoot.querySelector(secondary);

    if(!this.#svg){
      //console(this.host.shadowRoot.host.parentNode);
      throw new TypeError('Unable to locate SVG element');
    }
    return this;
  }

  drawLine(){

    this.#line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    this.#line.setAttribute('x1', this.#x1);
    this.#line.setAttribute('y1', this.#y1);
    this.#line.setAttribute('x2', this.#x2);
    this.#line.setAttribute('y2', this.#y2);

    this.#line.setAttribute('stroke', this.#stroke);
    this.#line.setAttribute('stroke-width', this.#strokeWidth);

    this.#svg.appendChild(this.#line);

    return this;
  }

  injectTemplateFromAttribute(attribute='type'){
    let value = this.host.getAttribute(attribute);
    const id = `#${value}`;
    const template = this.getApplication().shadowRoot.querySelector(id);
    this.template = template.content.cloneNode(true);
    return this;
  }

  injectTemplateFromTagName(){
    const id = `#${this.host.tagName.toLowerCase().split('-')[1]}`;
    const template = this.getApplication().shadowRoot.querySelector(id);
    this.template = template.content.cloneNode(true);
    return this;
  }

  consumeScript(){

    const scripts = this.template.querySelectorAll('script');
     scripts.forEach(script => {
       const scriptContent = script.textContent;
       // new Function(scriptContent).call(this);
       this.#scripts.push(scriptContent);
       script.remove()
     });
     ////console.log('Consumed scripts', this.#scripts);
    return this;

  }

  createElementPipe(){
      this.#pipe = new EventEmitter();
      return this;

  }

  wrapAttributeEvents(){
    const classContext = {
      root: this.getApplication().pipe,
      pipe: this.#pipe,
      data: this.context,
    };
    // theis is the embeded script's class
    const strContextClass = `${this.#scripts[0]}\n return new Main(this);`;
    const objContextClass = new Function(strContextClass).call(classContext);
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
          const codeFunction = new Function(`return ${code}`);
          // execute attribute code in context of class + retrieve user funcion (if any)
          const userFuncion = codeFunction.call(objContextClass);
          // execute user funcion
          if (userFuncion instanceof Function) userFuncion(match, this);
        });
      });
    } // supportedEvents
    if('mount' in objContextClass) objContextClass.mount();
    return this;
  }

  bindInputs(){
    const standardInputs = this.host.shadowRoot.querySelectorAll('input[value^="data"]');
    standardInputs.forEach(input => {
      const key = input.getAttribute('value').split('.',2)[1];
      console.log({key});
      if(this.context[key]){
        // send data from signal to input field
        const subscription = this.context[key].subscribe(v=>input.value = v);
        this.subscriptions.push( {type:'set input[value]', id:key, subscription} );
        // send data from input field to signal
        const setSignal = (event) => this.context[key].set(event.target.value)
        input.addEventListener("input", setSignal);
        this.subscriptions.push( {type:'signal set', id:key, subscription: ()=>input.remoevEventListener("input", setSignal)} );
      }
    });
    return this;
  }



















  monitorSourcePosition(){
    this.monitorPosition('from', (x,y)=>{this.#line.setAttribute('x1', x); this.#line.setAttribute('y1', y); });
    return this;
  }

  monitorTargetPosition(){
    this.monitorPosition('to', (x,y)=>{this.#line.setAttribute('x2', x); this.#line.setAttribute('y2', y); });
    return this;
  }






  movableAncestors(el) {
    //console('movableAncestors', el);
    const response = [];
    const isDataRoot = (el) => el?.tagName?.toLowerCase() !== 'data-root';

    while ((el = el.parentNode||el.host) && isDataRoot(el) && el !== document) {

      if(el instanceof Element){
        let style = getComputedStyle(el);
        if (style.position === 'absolute') {
          response.push(el);
        }
      }
    } // while
    return response;
  }

  resizableAncestors(el) {
    //console('resizableAncestors', el);
    const response = [];
    const isDataRoot = (el) => el?.tagName?.toLowerCase() !== 'data-root';

    while ((el = el.parentNode||el.host) && isDataRoot(el) && el !== document) {

      if(el instanceof Element){
        let style = getComputedStyle(el);
        response.push(el);
        if (style.position === 'absolute') {
          break;
        }
      }
    } // while
    return response;
  }

  cssStringToObject(cssString) {
      const cssObject = {};
      const declarations = cssString.split(';').map(part => part.trim()).filter(part => part.length > 0);

      declarations.forEach(declaration => {
          const [property, value] = declaration.split(':').map(part => part.trim());
          if (property && value) {
              const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
              cssObject[camelCaseProperty] = value;
          }
      });
      return cssObject;
  }

//   monitorPosition(attributeName, fun){
// this.monitorPosition2(attributeName, fun);
//     const observer = new MutationObserver((mutations) => {
//       this.monitorPosition2(attributeName, fun);
//     });
//
//     observer.observe(this.host.shadowRoot.host.parentNode, {
//       childList: true, // Observe direct children additions and removals
//       subtree: false  // Do not observe subtree changes
//     });
//
//     this.subscriptions.push( {type:'ChildObserver', id:'ancestor', subscription:()=>observer.disconnect()} );
//
//   }




  monitorPosition(attributeName, fun){

    //
    // if(this.monitoring){
    //   // already monitoring
    //   return this;
    // }

    let [primary, secondary] = this.host.getAttribute(attributeName).split('/');
    // let targetElement = null;
    ////console.log({primary, secondary});

    const doc = this.host.shadowRoot.host.parentNode;
    const targetElement2 = doc.querySelector(primary);
    const targetElement = targetElement2.shadowRoot.querySelector(secondary);



    if(!targetElement){
      ////console.log(`${this.host.tagName}, Unable to locate targetElement via selector ${selector}`, this.host.shadowRoot.host.parentNode.innerHTML);
      return this;
    }else{
      ////console.log('GOTIT', targetElement);
    }

    // this.monitoring = true;

    const calculatorFunction = ()=> {
      const {x,y, width, height} = targetElement.getBoundingClientRect();
      fun(x+width/2, y+height/2);
    }

    const resizeObserver = new ResizeObserver( entries => calculatorFunction() );
    this.resizableAncestors(targetElement).forEach(ancestor=>resizeObserver.observe(ancestor))
    this.subscriptions.push( {type:'ResizeObserver', id:'resizable-ancestors', subscription:()=>resizeObserver.disconnect()} );

    this.movableAncestors(targetElement).forEach(ancestor=>{
      const mutationObserver = new MutationObserver( mutations => {
        for (let mutation of mutations) {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const compare = ['left','top'];
            const old = this.cssStringToObject(mutation.oldValue);
            let recalculate = false;
            for (const name of compare) {
              if(ancestor.style[name] !== old[name]){
                recalculate = true;
                break;
              }
            }
            if(recalculate) calculatorFunction()
          }
        }
      });
      mutationObserver.observe(ancestor, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['style']
      });
      this.subscriptions.push( {type:'ResizeObserver', id:'ancestor', subscription:()=>mutationObserver.disconnect()} );
    });

    window.addEventListener('resize', calculatorFunction);
    this.subscriptions.push( {type:'addEventListener/resize', id:'window-resize', subscription:()=>window.removeEventListener('resize', calculatorFunction)} );

  }
}
