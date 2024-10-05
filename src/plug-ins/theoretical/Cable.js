import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Cable extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this
          .log('Entering Idle state...')
          .attachShadow()
          .adoptCss()
          .log('Entered Idle state'),
        exit: () => this
          .log('Exiting Idle state'),
      },
      loading: {
        enter: () => console.log('Entering Loading state'),
         exit: () => console.log('Exiting Loading state'),
      },
      error: {
        enter: () => console.log('Entering Error state'),
         exit: () => console.log('Exiting Error state'),
      },
      connected: {
        enter: () => this
          .log('Entering Connected state')
          .locateSvg()
          .drawLine()

          .monitorSourcePosition()
          .monitorTargetPosition()
          .connectPipes()
          .done,

         exit: () => console.log('Exiting Connected state'),
      },
    };
    this.machine = new StateMachine(states, 'idle');
  }



  //
  #svg;
  #line;

  #x1 = 0;
  #y1 = 0;
  #x2 = 256;
  #y2 = 256;
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
    return this;
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
      fromProgram.pipe.on(fromPortName, packet=>toProgram.pipe.send(toPortName, packet));
      return this;
    }

    getProgramPipe(attributeName){
      let [componentId, portId] = this.host.getAttribute(attributeName).split(':');

      const sceneComponent = this.getStage();

      const programComponent = sceneComponent.querySelector('#'+componentId);
      if(!programComponent) throw new Error(`Unable to locate programComponent ${programComponent}`)
      const portComponent = programComponent.shadowRoot.querySelector('#'+portId);
      if(!portComponent) throw new Error(`Unable to locate portComponent ${portComponent}`)

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
      console.log('resizableAncestors', response);
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



      // const target = this.findOut(portPad, '.perspective');
      // const flipper = this.findOut(portPad, '.flipper');
      //
      // if(target){
      //
      //   const card1 = flipper.querySelector('.card.primary');
      //   const card2 = flipper.querySelector('.card.secondary');
      //     target.addEventListener('transitionend', () => {
      //       console.log('VVV', flipper);
      //       // flipper.style.position = 'absolute';
      //       // flipper.style.transformStyle = 'flat';
      //       flipper.style.opacity = '.1';
      //       card1.style.opacity = '.1';
      //       card2.style.opacity = '.1';
      //       requestAnimationFrame(() => {
      //         // flipper.style.position = 'relative';
      //         // flipper.style.transformStyle = 'preserve-3d'; /* Forces a reflow and clears pixelation */
      //         flipper.style.opacity = '1'; /* Forces a reflow and clears pixelation */
      //         card1.style.opacity = '1'; /* Forces a reflow and clears pixelation */
      //         card2.style.opacity = '1'; /* Forces a reflow and clears pixelation */
      //       });
      //   });
      // }




      // if(target){
      //
      //   target.addEventListener('transitionstart', () => {
      //     if(target.classList.contains('flipped')) this.#line.setAttribute('opacity', 0);
      //   });
      //
      //   target.addEventListener('transitionend', () => {
      //
      //     flipper.style.transformStyle = 'none';
      //     requestAnimationFrame(() => {
      //       // flipper.style.transformStyle = 'preserve-3d'; /* Forces a reflow and clears pixelation */
      //     });
      //
      //     // if(!target.classList.contains('flipped')){
      //       // TODO: this is a hack
      //         // setTimeout(()=>this.#line.setAttribute('opacity', 1), 50)
      //             // target2.style.display = 'none';
      //             // requestAnimationFrame(() => {
      //             //   target2.style.display = 'block'; /* Forces a reflow and clears pixelation */
      //             // });
      //     // }
      //
      //   });

        // this.subscriptions.push( {type:'addEventListener/transitionstart', id:'transition', subscription:()=>target.removeEventListener('transitionstart', calculatorFunction)} );
        // this.subscriptions.push( {type:'addEventListener/transitionend', id:'transition', subscription:()=>target.removeEventListener('transitionend', calculatorFunction)} );


      // }

      window.addEventListener('resize', calculatorFunction);
      this.subscriptions.push( {type:'addEventListener/resize', id:'window-resize', subscription:()=>window.removeEventListener('resize', calculatorFunction)} );

    }



}
