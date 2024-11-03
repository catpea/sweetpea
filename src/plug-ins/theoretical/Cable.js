import Signal from 'signal';
import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';
import AutomaticTransmission from 'automatic-transmission';

export default class Cable extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const gearbox = {
      '/idle':{
        enter: () => this.attachShadow().adoptCss()
      },
      '/connected':{
        enter: () => this.locateSvg().drawLine().makeLineSelectable().installVisualSelectionIndicator().awaitSupervisors()
      },
      '/connected/idle': {
        enter: () => this.connectPipe().monitorSourcePosition().monitorTargetPosition()
      },
      '/connected/busy': {
        enter: () => ()=>disconnectPipe(),
        exit: () => ()=>connectPipe(),
      },
      '/disconnected':{
        enter: () => this.collectGarbage(),
      },
      '/error':{
        enter: () => this.flipTo('.card.error')
      },
    }

    this.transmission = new AutomaticTransmission(gearbox, '/idle');
    // this.subscriptions.push( {type:'queue', id:'transmission jobs...', subscription:()=>this.transmission.stop()} );

  }





  connectPipe(){

    const [,fromPortId] = this.host.getAttribute('from').split(':');
    const [,toPortId] = this.host.getAttribute('to').split(':');

    // NOTE: live program is required as .actor is used
    const fromProgram = this.getProgramComponent('from');
    const toProgram   = this.getProgramComponent('to');

    // const subscription = fromProgram.actor.on(fromPortId, packet=>toProgram.actor.send(toPortId, packet));
    const subscription = fromProgram.actor.on(fromPortId, packet=>{

      console.info(`Cable passing message between ${fromProgram.id} and ${toProgram.id}, on ports ${fromPortId}->${toPortId} as they are connected with a cable.`, packet);

      if(packet == undefined) throw new Error('Packet is a required parameter');
      if(packet.value == undefined) throw new Error('Packet .value is a required parameter');

        toProgram.actor.send(toPortId, packet);
    });
    this.subscriptions.push( {type:'.actor', id:'from-pipe-to-pipe', subscription} );

    //console.log('ttt', `${toPortId}:control`);
    const controlSubscription = toProgram.actor.on(`${toPortId}:control`, data=>fromProgram.actor.send('control', data) )

    this.subscriptions.push( {type:'.actor', id:'to-pipe-from-pipe', subscription} );

    return this;
  }















  awaitSupervisors(){

    let [fromId] = this.host.getAttribute('from').split(':', 1);
    let [toId] = this.host.getAttribute('to').split(':', 1);

    const fromSupervisor = this.getSupervisor(fromId);
    const toSupervisor   = this.getSupervisor(toId);

    const verdict = new Signal(null);
    const buffer = new Signal([]);

    const trash1 = fromSupervisor.state.subscribe(state=>{
      buffer.alter(b=>b[0]=state);
    })

    const trash2 = toSupervisor.state.subscribe(state=>{
      buffer.alter(b=>b[1]=state);
    })

    const trash3 = buffer.subscribe(buffer=>{
      if (buffer.length === 0) return;
      if(buffer.every(v=>v==='idle')){
        verdict.set('idle')
      }else if(buffer.every(v=>v==='ready')){
        verdict.set('ready')
      }else if(buffer.some(v=>v==='busy')){
        verdict.set('busy')
      }
    });

    const verdicts = {
      ready: '/connected',
      idle: '/connected/idle',
      busy: '/connected/busy',
    }

    const trash4 = verdict.subscribe(v=> v && this.transmission.shift(verdicts[v]) );

    [trash1,trash2,trash3,trash4].map(subscription=>this.subscriptions.push( {type:'signal', id:'signal-trash...', subscription} ))

    return this;

  }


  //
  #svg;
  #line;
  #clickOverlayline;

  #x1 = new Signal(0);
  #y1 = new Signal(0);
  #x2 = new Signal(0);
  #y2 = new Signal(0);

  #stroke = 'teal';
  #strokeWidth = '2';
  #strokeWidthClickOverlay = '8';

  installVisualSelectionIndicator(){
    const subscription = this.selected.subscribe(selected=>{
      if(selected){
        this.#line.setAttribute('stroke', 'yellowgreen');
      }else{
        this.#line.setAttribute('stroke', this.#stroke);
      }
    });
    this.subscriptions.push( {type:'svg/line', id:'cable', subscription} );
    return this;
  }


  locateSvg(){
    this.#svg = this.host.shadowRoot.host.closest('x-stage').shadowRoot.querySelector('svg');
    if(!this.#svg) throw new TypeError('Unable to locate SVG element');
    return this;
  }



  makeLineSelectable(){
    const mouseDownHandler = (event) => {
      //console.log(this.host, 'makeLineSelectable > mouseDownHandler');
      event.composedPath()
      if( this.host.hasAttribute('selected') ){
        if( this.host.getAttribute('selected') === "true"){
          this.host.removeAttribute('selected')
        }else{
          this.host.setAttribute('selected', "true")
        }
      }else{
        this.host.setAttribute('selected', "true");
      }
    };

    this.#clickOverlayline.addEventListener('mousedown', mouseDownHandler);
    this.subscriptions.push( {type:'svg/line', id:'cable-click', subscription:()=>{
      this.#clickOverlayline.removeEventListener('mousedown', mouseDownHandler);
    }});
    return this;
  }
  drawLine(){

    this.#line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.#clickOverlayline = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    this.subscriptions.push({type:'x1', id:'#line/x1', subscription: this.#x1.subscribe(v=>this.#line.setAttribute('x1', v)) });
    this.subscriptions.push({type:'y1', id:'#line/y1', subscription: this.#y1.subscribe(v=>this.#line.setAttribute('y1', v)) });
    this.subscriptions.push({type:'x2', id:'#line/x2', subscription: this.#x2.subscribe(v=>this.#line.setAttribute('x2', v)) });
    this.subscriptions.push({type:'y2', id:'#line/y2', subscription: this.#y2.subscribe(v=>this.#line.setAttribute('y2', v)) });

    this.#line.setAttribute('stroke', this.#stroke);
    this.#line.setAttribute('stroke-width', this.#strokeWidth);

    this.subscriptions.push({type:'x1', id:'#clickOverlayline/x1', subscription: this.#x1.subscribe(v=>this.#clickOverlayline.setAttribute('x1', v)) });
    this.subscriptions.push({type:'y1', id:'#clickOverlayline/y1', subscription: this.#y1.subscribe(v=>this.#clickOverlayline.setAttribute('y1', v)) });
    this.subscriptions.push({type:'x2', id:'#clickOverlayline/x2', subscription: this.#x2.subscribe(v=>this.#clickOverlayline.setAttribute('x2', v)) });
    this.subscriptions.push({type:'y2', id:'#clickOverlayline/y2', subscription: this.#y2.subscribe(v=>this.#clickOverlayline.setAttribute('y2', v)) });

    this.#clickOverlayline.setAttribute('stroke', this.#stroke);
    this.#clickOverlayline.setAttribute('stroke-width', this.#strokeWidthClickOverlay);
    this.#clickOverlayline.setAttribute('stroke-opacity', .4);

    // this.#clickOverlayline

    this.#svg.appendChild(this.#line);
    this.#svg.appendChild(this.#clickOverlayline);

    this.subscriptions.push( {type:'svg/line', id:'cable', subscription:()=>{
      this.#line.remove()
      this.#clickOverlayline.remove()
    }} );

    return this;
  }








    monitorSourcePosition(){
      this.monitorPosition('from', (x,y)=>{ this.#x1.set(x); this.#y1.set(y); });
      return this;
    }

    monitorTargetPosition(){
      this.monitorPosition('to', (x,y)=>{ this.#x2.set(x); this.#y2.set(y); });
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
      if(!el) throw new Error('resizableAncestors requires a starting element to search upwards')
      const response = [];
      const isDataRoot = (el) => el?.tagName?.toLowerCase() !== 'data-root';

      while ((el = el.parentNode||el.host) && isDataRoot(el) && el !== document) {
        ////////console.log('XXXXXX', );
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
      if(!cssString) return {}
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




    getSupervisor(id){

      const stage = this.getStage();
      if(!stage) throw new Error('Lol, unable to locate stage!!!!!');

      const programComponent = stage.querySelector('#'+id);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)

      return programComponent;
    }

    getProgramComponentAndPort(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      //console.log({componentId, portId});
      const stage = this.getStage();
      if(!stage) throw new Error('Lol, unable to locate stage!!!!!');

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)


      const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
     // //console.log(programComponent.shadowRoot.innerHTML);
      if(!portComponent) throw new Error(`${this.host.tagName.toLowerCase()}#${this.host.getAttribute('id')} is unable to locate portComponent named "${'#'+portId}" in ${programComponent.tagName.toLowerCase()}#${componentId}`)

      return [programComponent, portComponent];

    }

    getProgramComponent(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)

      return programComponent;

    }

    getProgramPort(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)
      const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
      if(!portComponent) throw new Error(`Unable to locate portComponent ${portComponent}`)

      return [programComponent, portComponent];

    }


    monitorPosition(attributeName, fun){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();
      const programComponent = stage.querySelector('#'+componentId);
      const targetNode = programComponent.shadowRoot.querySelector('[data-render=parameters]')
      const config = { attributes: false, childList: true, subtree: true };

      //console.log('RRR monitorPosition', programComponent.tagNattributeName, programComponent.getAttribute('id'), targetNode);

      //console.log('WWW',  targetNode);

      // Callback function to execute when mutations are observed
      const callback = (mutationList, observer) => {
        //console.log('EEE mutationList',  mutationList);
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            //console.log("RRR A child node has been added or removed.");
            //console.log('RRR programComponent', programComponent);
            const portNode = programComponent.shadowRoot.getElementById(portId);
            //console.log('RRR portNode', portNode);

            const portExists = !!portNode;
            //console.log('RRR portExists', portExists);
            if(portExists){
              this.monitorPosition2(attributeName, fun);
            }
          } else if (mutation.type === "attributes") {
            //console.log(`The ${mutation.attributeName} attribute was modified.`);
          }
        }
      };


      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
      this.subscriptions.push( {type:'observer.observe', id:'ports', subscription:()=>observer.disconnect()} );

      // sometimes no changes are triggered
      callback([{type:'childList'}])
    }

    monitorPosition2(attributeName, fun){

      const [programComponent, portComponent] = this.getProgramComponentAndPort(attributeName);
      const portPad = portComponent.shadowRoot.querySelector('.valve');

      //console.log('EEE located port', programComponent.getAttribute('id'), portComponent);

      if(!portComponent){
        this.danger(`${this.host.tagName}, Unable to locate portComponent via selector ${componentId}:${portId}`, 'danger');
        return this;
      }

      // this.monitoring = true;

      const calculatorFunction = ()=> {

        let {x:elementX,y:elementY, width:elementW, height:elementH} = portPad.getBoundingClientRect();

        const scrollLeft = window.scrollX || window.pageXOffset;
        const scrollTop = window.scrollY || window.pageYOffset;
        elementX = elementX + scrollLeft;
        elementY = elementY + scrollTop;

        const panZoom = this.getStage()
        if(!panZoom) return; // component destroyed
        let {x:panX,y:panY} = panZoom.pan;
        let zoom = panZoom.zoom;

        elementX = elementX / zoom;
        elementY = elementY / zoom;

        elementW = elementW / zoom;
        elementH = elementH / zoom;

        const centerW = elementW/2;
        const centerH = elementH/2;

        panX = panX / zoom;
        panY = panY / zoom;

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
