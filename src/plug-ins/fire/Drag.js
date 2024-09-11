export default class Drag {
  dragging = false;
  area = window;
  handle = null;
  scale = ()=>1;

  // these are functions to be optionally executed before and after change
  before;
  after;

  change({x,y}){
    console.info(`Override movement ${x}/${y}`);
  }

  mouseDownHandler;
  mouseMoveHandler;
  mouseUpHandler;

  dragging = false;
  previousX = 0;
  previousY = 0;

  constructor({handle, area, change, before, after, scale}){

    if(handle) this.handle = handle;
    if(area)  this.area = area;

    if(before) this.before = before;
    if(change) this.change = change;
    if(after) this.after = after;

    if(scale) this.scale = scale;

    this.#mount();
  }

  #mount(){

    this.mouseDownHandler = (e) => {
      this.previousX = e.screenX;
      this.previousY = e.screenY;
      this.dragging = true;
      this.area.addEventListener('mousemove', this.mouseMoveHandler);
    };

    this.mouseMoveHandler = (e) => {

      let movementX = e.screenX - this.previousX;
      let movementY = e.screenY - this.previousY;

      const scale = this.scale();

      movementX = movementX/scale;
      movementY = movementY/scale;

      if(this.before) this.before({e, dx:movementX, dy:movementY });
      this.change({e, dx:movementX, dy:movementY });
      if(this.after) this.after({e, dx:movementX, dy:movementY });

      this.previousX = e.screenX
      this.previousY = e.screenY

     };

    this.mouseUpHandler = (e) => {
      if(!this.dragging) return;
      this.area.removeEventListener('mousemove', this.mouseMoveHandler);
      this.dragging = false;

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
