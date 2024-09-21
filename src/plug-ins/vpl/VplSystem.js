import espree from "../../../bundle.js";
import Signal from '../variables/Signal.js';

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
  pipe;
  klass;



  locateSvg(){

    this.#svg = this.getScene().shadowRoot.querySelector('svg');

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
    /////////console.log(this.host.tagName, 'injectTemplateFromTagName' , this.template);
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
     ///////////////console.log('Consumed scripts', this.#scripts);
    return this;

  }

  createElementPipe(){
      this.pipe = new EventEmitter();
      return this;

  }

  wrapAttributeEvents(){

    const classContext = {
      root: this.getApplication().pipe,
      pipe: this.pipe,
      data: this.context,
    };
    // theis is the embeded script's class
    const strContextClass = `${this.#scripts[0]}\n return new Main(this);`;
    this.klass = new Function(strContextClass).call(classContext);
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
          const userFuncion = codeFunction.call(this.klass);
          // execute user funcion
          if (userFuncion instanceof Function) userFuncion(match, this);
        });
      });
    } // supportedEvents
    if('mount' in this.klass) this.klass.mount();
    return this;
  }

  bindInputs(){
    const standardInputs = this.host.shadowRoot.querySelectorAll('input[value^="data"]');
    //////console.log('bindInputs', standardInputs);
    standardInputs.forEach(input => {
      const key = input.getAttribute('value').split('.',2)[1];
      ///////////console.log({key});
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

  bindDoubleCurly(){
    const allElements = this.host.shadowRoot.querySelectorAll('*');
    //////console.log('bindDoubleCurly', allElements);
    allElements.forEach(element => {
      if (element.hasAttributes()) {
         for (const attr of element.attributes) {
           const originalValue = attr.value;
           const dependencies = this.extractCurlyDependencies( attr.value );


           const compositeContext = {};

           for (const key of dependencies) {
             if(!this.context[key]){
               compositeContext[key] = new Signal(this.host.getAttribute(key)); // TODO: monitor attribute in host for changes
             }else{
               compositeContext[key] = this.context[key];
             }
           }


           for (const key of dependencies) {
             const subscription = compositeContext[key].subscribe( v=>element.setAttribute(attr.name, this.interpolateCurly(originalValue, compositeContext)) );
             this.subscriptions.push( {type:'set input[value]', id:key, subscription} );
           }
         }
      }
      ///////////console.log({element});
    });
    return this;
  }

  extractCurlyDependencies(template) {
    const dependencies = [];
    // Regular expression to match placeholders in the format ${property} or {{property}}
    // const placeholderPattern = /{{([^}]+)}}|\${([^}]+)}/g;
    const placeholderPattern = /{{((?:[^{}]|{[^{}]*})*)}}/g; // EXPERIMENTAL
    // Function to handle replacement
    const replaceFunction = (match, property) => {
      ///////////console.log('QQQ ssss', property, arguments);
      const tokens = espree.tokenize(property, { ecmaVersion: 2020 });
      const properties = tokens.filter(o=>o.type==='Identifier').map(o=>o.value)
      dependencies.push(...properties);
    }
    // Replace all placeholders in the template string using replaceFunction
    template.replace(placeholderPattern, replaceFunction);
    return dependencies;
  }

  interpolateCurly(template, context) {
    // Regular expression to match placeholders in the format ${property} or {{property}}
    // const placeholderPattern = /{{([^}]+)}}|\${([^}]+)}/g;
    const placeholderPattern = /{{((?:[^{}]|{[^{}]*})*)}}/g; // EXPERIMENTAL

    // Function to handle replacement
    const replaceFunction = (match, property) => {

      // const valueSnapshot = [];
      // for (const variableName in context) {
      //   const variableValue = context[variableName].get();
      //   valueSnapshot.push(`const ${variableName} = ${JSON.stringify(variableValue)};`)
      // }
      // const valueHeader = valueSnapshot.join('\n') + '\n';
      const compositeProgram = this.billOfValues(context) + 'return ' + property;
      const result = new Function(compositeProgram).call(context);

      ///////////console.log('XXX', compositeProgram);
      ///////////console.log('XXX', { result });
      return result;

    };
    // Replace all placeholders in the template string using replaceFunction
    const interpolatedString = template.replace(placeholderPattern, replaceFunction);
    return interpolatedString;
  }



















  monitorSourcePosition(){
    this.monitorPosition('from', (x,y)=>{
      this.#line.setAttribute('x1', x); this.#line.setAttribute('y1', y);
    });
    return this;
  }

  monitorTargetPosition(){
    this.monitorPosition('to', (x,y)=>{
      this.#line.setAttribute('x2', x); this.#line.setAttribute('y2', y);
    });
    return this;
  }

  connectPipes(){
    const [fromProgram, fromPort] = this.getProgramPipe('from');
    const [toProgram, toPort] = this.getProgramPipe('to');

    const fromPortName = fromPort.getAttribute('id');
    const toPortName = toPort.getAttribute('id');

    ///////////console.log(`Sending packet from ${fromProgram.getAttribute('id')} on port ${fromPortName}`);
    ///////////console.log({fromProgram});
    ///////////console.log({toProgram});

    fromProgram.pipe.on(fromPortName, packet=>toProgram.pipe.send(toPortName, packet));

  }

  getProgramPipe(attributeName){
    let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
    // const sceneComponent = this.host.shadowRoot.host.parentNode.parentNode.parentNode.parentNode
    // const sceneComponent = this.getScene()
    // /////////console.log(this.host.tagName, {sceneComponent});
    // /////////console.log({componentId, portId});
    // const programComponent = this.getScene().registry.get(componentId)
    //
    // // const programComponent = sceneComponent.querySelector('#'+componentId);
    // /////////console.log('getProgramPipe', programComponent.shadowRoot);
    // /////////console.log({programComponent});
    const sceneComponent = this.host.parentNode;
    /////////console.log(sceneComponent);
    const programComponent = sceneComponent.querySelector('#'+componentId);
    const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
    return [programComponent, portComponent];
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
    if(!el) throw new Error('resizableAncestors requires a starting element to search upwards')
    const response = [];
    const isDataRoot = (el) => el?.tagName?.toLowerCase() !== 'data-root';

    while ((el = el.parentNode||el.host) && isDataRoot(el) && el !== document) {
      //////console.log('XXXXXX', );
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





  monitorPosition(attributeName, fun){

    // let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
    // const sceneComponent = this.host.shadowRoot.host.parentNode;
    // const programComponent = sceneComponent.querySelector('#'+componentId);
    // const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
    const [programComponent, portComponent] = this.getProgramPipe(attributeName);
    const portPad = portComponent.shadowRoot.querySelector('.port-pad');
    //////console.log('portComponent', portComponent.shadowRoot, {portPad});

    if(!portComponent){
      // this.danger(`${this.host.tagName}, Unable to locate portComponent via selector ${componentId}:${portId}`, 'danger');
      return this;
    }

    // this.monitoring = true;

    const calculatorFunction = ()=> {

      const scale = portPad.getBoundingClientRect().width / portPad.offsetWidth;

      // The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
      let {x:elementX,y:elementY, width:elementW, height:elementH} = portPad.getBoundingClientRect();

      elementX = elementX / scale;
      elementY = elementY / scale;

      elementW = elementW / scale;
      elementH = elementH / scale;

      const centerW = elementW/2;
      const centerH = elementH/2;


      const panZoom = this.findOut(portComponent.shadowRoot, 'root-space');
      let {x:panX,y:panY} = panZoom.pan;
      panX = panX / scale;
      panY = panY / scale;

      const positionedX = elementX-panX;
      const positionedY = elementY-panY;

      const centeredX = positionedX+centerW;
      const centeredY = positionedY+centerH;

      fun(centeredX, centeredY);
    }

    const resizeObserver = new ResizeObserver( entries => calculatorFunction() );
    this.resizableAncestors(portPad).forEach(ancestor=>resizeObserver.observe(ancestor))
    this.subscriptions.push( {type:'ResizeObserver', id:'resizable-ancestors', subscription:()=>resizeObserver.disconnect()} );

    this.movableAncestors(portPad).forEach(ancestor=>{
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
