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
        enter: () => this.locateSvg().drawLine().awaitSupervisors()
      },
      '/connected/idle': {
        enter: () => this.monitorSourcePosition().monitorTargetPosition().connectPipes()
      },
      '/connected/busy': {
        enter: () => ()=>this.#line.setAttribute('stroke', 'gray'),
        exit: () => ()=>this.#line.setAttribute('stroke', this.#stroke),
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

  awaitSupervisorsCounter = 0;

  awaitSupervisors(){

    // console.warn( 'awaitSupervisors' );

    this.awaitSupervisorsCounter++

    if(this.awaitSupervisorsCounter>1) throw new Error('awaitSupervisorsCounter can only be called once!')
    if(this.awaitSupervisorsCounter>5) return console.log('awaitSupervisorsCounter', this.awaitSupervisorsCounter);

    let [fromId] = this.host.getAttribute('from').split(':', 1);
    let [toId] = this.host.getAttribute('to').split(':', 1);

    const fromSupervisor = this.getSupervisor(fromId);
    const toSupervisor   = this.getSupervisor(toId);

    const verdict = new Signal(null);
    const buffer = new Signal([]);

    const trash1 = fromSupervisor.state.subscribe(state=>{
      // console.log('fromSupervisor state change to', state);
      buffer.alter(b=>b[0]=state);
    })

    const trash2 = toSupervisor.state.subscribe(state=>{
      // console.log('toSupervisor state change to', state);
      buffer.alter(b=>b[1]=state);
    })


    const trash3 = buffer.subscribe(buffer=>{

      // console.log('QQ buffer', this.host.getAttribute('id'), buffer);

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

    // verdict.subscribe(v=>console.log('QQQ VERDICCT', v, verdicts[v]));
    const trash4 = verdict.subscribe(v=> v && this.transmission.shift(verdicts[v]) );
    // const trash4 = verdict.subscribe(v=>console.log('VERDICCT', v));

    [trash1,trash2,trash3,trash4].map(subscription=>this.subscriptions.push( {type:'signal', id:'signal-trash...', subscription} ))

    return this;
  }


  //
  #svg;
  #line;

  #x1 = 0;
  #y1 = 0;
  #x2 = 0;
  #y2 = 0;
  #stroke = 'green';
  #strokeWidth = '2';

  locateSvg(){
    this.#svg = this.host.shadowRoot.host.closest('x-stage').shadowRoot.querySelector('svg');
    if(!this.#svg) throw new TypeError('Unable to locate SVG element');
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

    this.subscriptions.push( {type:'svg/line', id:'cable', subscription:()=>this.#line.remove()} );
    return this;
  }








    monitorSourcePosition(){
      this.monitorPosition('from', (x,y)=>{ this.#line.setAttribute('x1', x); this.#line.setAttribute('y1', y); });
      return this;
    }

    monitorTargetPosition(){
      this.monitorPosition('to', (x,y)=>{ this.#line.setAttribute('x2', x); this.#line.setAttribute('y2', y); });
      return this;
    }

    // connectPipes0(){
    //   let counter = 0;
    //
    //   const fromProgram = this.programPipe('from');
    //   const toProgram = this.programPipe('to');
    //
    //   const resume = function(){
    //     console.log('CALLING connectPipes2');
    //     this.connectPipes2()
    //   }.bind(this)
    //
    //   fromProgram.addEventListener('ready', (event) => {
    //     counter++;
    //     if (counter==2) resume()
    //   });
    //   toProgram.addEventListener('ready', (event) => {
    //     counter++;
    //     if (counter==2) resume()
    //   });
    //
    //   return this;
    //
    // }

    connectPipes(){

      const stage = this.getStage();
      if(!stage)  {
        console.log('Lol, unable to locate stage!!!!!');
        return this
      }


      const [fromProgram, fromPort] = this.getProgramPipe('from');
      const [toProgram, toPort] = this.getProgramPipe('to');

      const fromPortName = fromPort.getAttribute('id');
      const toPortName = toPort.getAttribute('id');

      fromProgram.pipe.on(fromPortName, packet=>toProgram.pipe.send(toPortName, packet));

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













    getProgramPipe(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();
      if(!stage) throw new Error('Lol, unable to locate stage!!!!!');

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)
      const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
      if(!portComponent) throw new Error(`Unable to locate portComponent ${portComponent}`)

      return [programComponent, portComponent];

    }


    programPipe(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)

      return programComponent;

    }
    programPort(attributeName){

      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');
      const stage = this.getStage();

      const programComponent = stage.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)
      const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
      if(!portComponent) throw new Error(`Unable to locate portComponent ${portComponent}`)

      return [programComponent, portComponent];

    }

    // monitorPosition0(attributeName, fun){
    //
    //   let [componentId] = this.host.getAttribute(attributeName).split(':', 1);
    //   const stage = this.getStage();
    //   const programComponent = stage.querySelector('#'+componentId);
    //   programComponent.addEventListener('ready', (event) => {
    //     console.log('READY!!!!!!!');
    //     // console.log(event.detail.message); // Outputs: Button was clicked!
    //     this.monitorPosition2(attributeName, fun)
    //   });
    //   return this;
    //
    // }

    monitorPosition(attributeName, fun){



      const [programComponent, portComponent] = this.getProgramPipe(attributeName);
      const portPad = portComponent.shadowRoot.querySelector('.valve');

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
