import Theoretical from './Theoretical.js';
import StateMachine from 'state-machine';

export default class Stage extends Theoretical {
  machine;

  constructor(host) {
    super(host);

    const states = {
      idle: {
        enter: () => this
          .log('Entering Idle state...')
          .attachShadow()
          .adoptCss()
          .createElementPipe()
          .done,
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

          .getStageTemplate()
          .installTemplate()
          .installStageView()

          .installStageListeners()

          .wrapAttributeEvents()
          .done,
         exit: () => console.log('Exiting Connected state'),
       },
       disconnected: {
        enter: () => this.collectGarbage(),
          exit: () => console.log('Exiting disconnected'),
       },
    };
    this.machine = new StateMachine(states, 'idle');
  }



  getStageTemplate(){
    const html = `
    <style>
      :host {
        display: block;
        overflow: hidden;
        position: relative;

        touch-action: none;
        user-select: none;
      }
      .content {
        transform-origin: 0 0;
      }

      .vertical {
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

      }
    </style>



    <div class="content" style="min-height: 100vh;">
      <svg class="position-absolute overflow-visible w-100 h-100" xmlns="http://www.w3.org/2000/svg"></svg>
      <slot></slot>
    </div>





    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="">

      <div class="toast bg-dark" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="5000".>
        <div class="toast-header">
          <i class="bi bi-bandaid me-2"></i>
          <strong class="me-auto">TODO</strong>
          <small>note to self</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
        SUPERVISOR READY EVENT (bug in Cable, must use READY events of supervisor due to remote port loading)
        stage controls (<i class="bi bi-zoom-in"></i><i class="bi bi-zoom-out"></i><i class="bi bi-fullscreen"></i><i class="bi bi-lock"></i>),
        worker selection,
        fix up the fetch and filter workers,
        worker browser,
        worker builder.
        </div>
      </div>

      <div class="toast bg-dark" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="30000".>
        <div class="toast-header">
          <i class="bi bi-bandaid me-2"></i>
          <strong class="me-auto">Program Help</strong>
          <small>usage tips</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          To select/deselect a component click its caption text.
          Use <kbd>DEL</kbd> to remove selected components.
          Double click on the stage to cerate a new component.
          You are going to create a worker supervisor, you must then specify a worker.
        </div>
      </div>

    </div>




    <div class="position-absolute btn-toolbar vertical pt-5 ps-2 " role="toolbar" aria-label="Toolbar with button groups" style="left: 0px; top: 0px; z-index: 10;">

      <div class="btn-group-vertical mb-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.open()" data-bs-toggle="popover" data-bs-title="Open File" data-bs-trigger="hover focus" data-bs-content="Load data from your computer."><i class="bi bi-folder2-open"></i></button>
        <!-- <button type="button" class="btn btn-outline-secondary" onclick="()=>this.saveAs()"><i class="bi bi-save"></i></button> -->
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.save()" data-bs-toggle="popover" data-bs-title="Save Stage" data-bs-trigger="hover focus" data-bs-content="Save project to your computer."><i class="bi bi-floppy2"></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.blank()" data-bs-toggle="popover" data-bs-title="Clear Stage" data-bs-trigger="hover focus" data-bs-content="Clear the stage of all actors and begin a new project."><i class="bi bi-eraser"></i></button>
      </div>

      <!-- debugger buttons
      <div class="btn-group-vertical mb-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.root.emit('play');"><i class="bi bi-play"></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="el=>this.say(el)"><i class="bi bi-arrow-clockwise text-danger" ></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-arrow-90deg-down flip-horizontal" ></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-arrow-90deg-right"></i></button>
      </div>
      -->

      <div class="btn-group-vertical mb-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.generateCode()" data-bs-toggle="popover" data-bs-title="Code Generator" data-bs-trigger="hover focus" data-bs-content="Generate a standalone program that does not require sweetpea to run."><i class="bi bi-rocket-takeoff text-danger"></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.add()" data-bs-toggle="popover" data-bs-title="Function Browser" data-bs-trigger="hover focus" data-bs-content="Add a new function to your program."><i class="bi bi-robot text-success"></i></button>
        <button type="button" class="btn btn-outline-secondary" onclick="()=>this.add()" data-bs-toggle="popover" data-bs-title="Function Creator" data-bs-trigger="hover focus" data-bs-content="Add a new function to your program."><i class="bi bi-puzzle text-primary"></i></button>
      </div>


    </div>

    <div class="position-absolute btn-toolbar vertical pt-3 ps-2 " role="toolbar" aria-label="Toolbar with button groups" style="left: 0px; bottom: 0px; z-index: 10;">
      <div class="btn-group-vertical mb-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-zoom-in"></i></button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-zoom-out"></i></button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-fullscreen"></i></button>
        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="console.log(this)"><i class="bi bi-lock"></i></button>
      </div>
    </div>



    <!-- NOTE: iframe to handle the Blob redirection -->
    <iframe id="downloadIframe" style="display:none;"></iframe>
    <!-- NOTE: iframe to handle file opening -->
    <input type="file" id="fileInput" style="display: none;" />
    `;
    const templateContainer = document.createElement('template');
    templateContainer.innerHTML = html;
    this.template = templateContainer.content.cloneNode(true);
    return this;
  }



  installStageView({attribute}={attribute:"worker"}){


    this.View = class View {

      constructor({stage, core, root, pipe, data}){
        this.stage = stage;
        this.core = core;
        this.root = root;
        this.pipe = pipe;
        this.data = data;

        // this.worker = new Worker(stage);
      }

      mount(){

        document.addEventListener("keydown", (event) => {
          if (event.isComposing || event.keyCode === 229) {
            return;
          }

          const keyName = event.key;

          if (keyName === "Control") {
            // do not alert when only Control key is pressed.
            return;
          }

          if (event.ctrlKey) {
            // Even though event.key is not 'Control' (e.g., 'a' is pressed),
            // event.ctrlKey may be true if Ctrl key is pressed at the same time.
            // console.log(`Combination of ctrlKey + ${keyName}`);
          } else {

            // console.log(`Key pressed ${keyName}`);
            if (keyName === "Delete") {
              for (const supervisor of this.core.host.querySelectorAll(`${globalThis.sweetpea.prefix}-super`)) {
                if(supervisor.getAttribute('selected') === "true"){

                  // Before removing element remove the cables!
                  for (const cable of this.core.host.querySelectorAll(`${globalThis.sweetpea.prefix}-cable`)) {
                    if(cable.getAttribute('from').split(':')[0] === supervisor.getAttribute('id')) cable.remove();
                    if(cable.getAttribute('to').split(':')[0] === supervisor.getAttribute('id')) cable.remove();
                  }

                  supervisor.remove();
                }
              }
              return;
            }

          }

        }, false);


        this.core.host.shadowRoot.querySelectorAll('.toast').forEach(toastElement=>{
          const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement)
          toastBootstrap.show();
          toastElement.querySelector('.btn-close').addEventListener('click', () => toastBootstrap.hide())
        })

        const popoverTriggerList = this.core.host.shadowRoot.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => {
          new bootstrap.Popover(popoverTriggerEl)
          popoverTriggerEl.addEventListener('hidden.bs.popover', () => {
          this.core.host.shadowRoot.querySelectorAll('.toast').forEach(toast=>bootstrap.Toast.getOrCreateInstance(toast).hide())
          })
        })


      }



      add(){
        const options = {};
        const myModalAlternative = new bootstrap.Modal('#exampleModal', options)
        myModalAlternative.show();

        //this.core.createSupervisor()




      }


      blank(){
        this.core.blank()
      }

      open(){
        this.core.open()
      }

      save(){
        this.core.save()
      }

      saveAs(){
        this.core.saveAs()
      }

      generateCode(){
        this.core.generateCode()
      }




    }

    return this;
  }


  installStageListeners(){
    this.content = this.host.shadowRoot.querySelector('.content');

    this.host.addEventListener('mousedown',  this.#onMouseDown.bind(this));
    this.host.addEventListener('mousemove',  this.#onMouseMove.bind(this));
    this.host.addEventListener('mouseup',    this.#onMouseUp.bind(this));
    this.host.addEventListener('wheel',      this.#onWheel.bind(this), { passive: false });
    this.host.addEventListener('touchstart', this.#onTouchStart.bind(this));
    this.host.addEventListener('touchmove',  this.#onTouchMove.bind(this));
    this.host.addEventListener('touchend',   this.#onTouchEnd.bind(this));

    this.host.addEventListener('dblclick',   this.#dblClick.bind(this));

    return this;
  }

  #dblClick(e){
    const stage = this.getStage();

    let {x:panX,y:panY} = stage.pan;
    let zoom = stage.zoom;

    // using clicked coordinates
    let x = e.clientX;
    let y = e.clientY;

    // transform them with zoom
    x = x / zoom;
    y = y / zoom;

    // transform pan values with zoom
    panX = panX / zoom;
    panY = panY / zoom;

    // and transform clicked coordinates with pan
    x = x-panX;
    y = y-panY;

    this.createSupervisor({x,y, initialFace:'.card.worker-configuration'});

  }


    // Reference
    content;

    // Public State
    pan = { x: 0, y: 0 };
    zoom = 1;

    // Protected
    #startPan = { x: 0, y: 0 };
    #startMousePos = { x: 0, y: 0 };
    #isPanning = false;

    // Public
    updateTransform() {
        this.content.style.transform = `translate(${this.pan.x}px, ${this.pan.y}px) scale(${this.zoom})`; //NOTE: rotateY(0deg) rotateY(0deg) prevents blurring in certain conditions
    }

    // Protected
    #onMouseDown(event) {

        console.log('event.target', event.target);
        if(event.target !== this.host) return

        this.#isPanning = true;
        this.#startMousePos = { x: event.clientX, y: event.clientY };
        this.#startPan = { ...this.pan };

        event.preventDefault();
    }

    #onMouseMove(event) {
      if (this.#isPanning) {
        this.pan.x = this.#startPan.x + (event.clientX - this.#startMousePos.x);
        this.pan.y = this.#startPan.y + (event.clientY - this.#startMousePos.y);
        this.updateTransform();
      }
    }

    #onMouseUp(event) {
      this.#isPanning = false;
    }

    #onWheel(event) {
      const deltaScale = event.deltaY > 0 ? 0.9 : 1.1;
      this.zoom *= deltaScale;

      const rect = this.host.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      this.pan.x = offsetX * (1 - deltaScale) + deltaScale * this.pan.x;
      this.pan.y = offsetY * (1 - deltaScale) + deltaScale * this.pan.y;

      this.updateTransform();
      event.preventDefault();
    }

    #onTouchStart(event) {
      if (event.touches.length === 1) {
        this.#isPanning = true;
        this.#startMousePos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        this.#startPan = { ...this.pan };
      }
      event.preventDefault();
    }

    #onTouchMove(event) {
      if (this.#isPanning && event.touches.length === 1) {
        this.pan.x = this.#startPan.x + (event.touches[0].clientX - this.#startMousePos.x);
        this.pan.y = this.#startPan.y + (event.touches[0].clientY - this.#startMousePos.y);
        this.updateTransform();
      }
    }

    #onTouchEnd(event) {
      this.#isPanning = false;
    }


}
