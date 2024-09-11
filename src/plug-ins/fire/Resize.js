export default class Resize {

  box;
  area = window;
  handle = null;

  scale;

  before = ()=>{};
  movement = ()=>{};
  after = ()=>{};

  mouseDownHandler;
  mouseMoveHandler;
  mouseUpHandler;

  dragging  = false;
  previousX = 0;
  previousY = 0;
  minimumX  = 128;
  minimumY  = 128;

  sinkX=0;
  sinkY=0;

  simulatedW=0;
  simulatedH=0;


  constructor({box, handle, area, before, movement, after, scale, minimumX, minimumY}){
    this.box = box;
    this.handle = handle;
    this.area = area;
    this.before = before;
    this.movement = movement;
    this.after = after;
    this.scale = scale;
    this.minimumX = minimumX;
    this.minimumY = minimumY;
    this.#mount();
  }

  #mount(){

    this.mouseDownHandler = (e) => {
      this.previousX = e.screenX;
      this.previousY = e.screenY;
      this.sinkX = 0;
      this.sinkY = 0;
      this.simulatedW = this.box.w;
      this.simulatedH = this.box.h;
      this.area.addEventListener('mousemove', this.mouseMoveHandler);
      this.before();
    };

    this.mouseMoveHandler = (e) => {
      // if(e.target !== this.handle) return;
      // e.preventDefault();
      // e.stopPropagation();
      let movementX = this.previousX - e.screenX;
      let movementY = this.previousY - e.screenY;

      // correct drag speed
      // const localList = this.transforms();
      // const self = localList[localList.length-1];
      // const finalZoom = localList.map(o=>o.zoom).reduce((a,c)=>a*c,1)/self.zoom;
      const scale = this.scale();
      movementX = movementX/scale;
      movementY = movementY/scale;
      // correct drag speed

      //
      this.simulatedW -= movementX;
      this.simulatedH -= movementY;

      let limitX = this.simulatedW < this.minimumX;
      let limitY = this.simulatedH < this.minimumY;

      if(limitX){
        this.sinkX = this.sinkX - movementX;
        this.box.w = this.minimumX; // park in resting position
      }else{
        this.box.w = this.simulatedW; // sync with virual, now that it is out of limit contraint
      }

      if(limitY){
        this.sinkY = this.sinkY - movementY;
        this.box.h = this.minimumY; // park in resting position
      }else{
        this.box.h = this.simulatedH; // sync with virual, now that it is out of limit contraint
      }




      this.previousX = e.screenX
      this.previousY = e.screenY

     };

    this.mouseUpHandler = (e) => {
      this.after();
      this.area.removeEventListener('mousemove', this.mouseMoveHandler);
    };

    this.handle.addEventListener('mousedown', this.mouseDownHandler);
    this.area.addEventListener('mouseup', this.mouseUpHandler);

  }

  destroy(){
    this.handle.removeEventListener('mousedown', this.mouseDownHandler);
    this.area.removeEventListener('mousemove', this.mouseMoveHandler);
    this.area.removeEventListener('mouseup', this.mouseUpHandler);
  }

}
