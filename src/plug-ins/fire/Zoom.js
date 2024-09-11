import translateCursor from '/plug-ins/translate-cursor/index.js';

const segments = new Map(); // for debug

export default class Zoom {

  event = 'wheel';

  area;
  handle;
  getter;

  before = ()=>{};
  change = ()=>{};
  after = ()=>{};
  feedback = ()=>{};

  magnitude; // magnitude of change
  min;
  max;

  constructor({ getter, component, transforms, area=window, handle, before=()=>{}, change, after=()=>{}, feedback=()=>{}, magnitude=1, min=0.1, max=5, }){

    this.transforms = transforms;
    this.component = component;
    this.area = area;
    this.handle = handle;
    this.getter = getter;
    this.before = before;
    this.change = change;
    this.after = after;
    this.feedback = feedback;
    this.magnitude = magnitude;
    this.min = min;
    this.max = max;

    this.#mount();
  }

  #mount(){

    this.movelHandler = (e) => {
    }

    this.wheelHandler = (e) => {

      e.stopImmediatePropagation();

      ///NOTE: e.stopPropagation() is insufficent e.stopImmediatePropagation(); must be called to end other component zooming problems.
      // e.preventDefault();


      this.before(this);

      const INTO = +1;
      const OUTOF = -1;
      let zoomDirection = e.deltaY>0?OUTOF:INTO;
      const [cursorX, cursorY] = translateCursor(e.clientX, e.clientY, this.transforms());

      const transformed = this.#translateZoom({ zoom: this.getter('zoom'), panX: this.getter('panX'), panY: this.getter('panY'), cursorX, cursorY, deltaZoom: zoomDirection, magnitude: this.magnitude });

      this.change(transformed);
      this.after(this);

    };

    this.area.addEventListener(this.event, this.wheelHandler );
    this.handle.addEventListener(this.event, this.wheelHandler );
    this.area.addEventListener('mousemove', this.movelHandler );
  }

  destroy(){
    this.area.removeEventListener(this.event, this.wheelHandler);
    this.handle.removeEventListener(this.event, this.wheelHandler);
    this.area.removeEventListener('mousemove', this.movelHandler);
  }

  #translateZoom({zoom, panX, panY,   deltaZoom, cursorX, cursorY,   magnitude=1, min=0.01, max=1_000}){
    // This Algorithm Is Correct - Do Not Edit
    const zoomClamp = v=>Math.min(max, Math.max(min, v)); // using `Math.min(max, value)` to ensure the value doesn't exceed the `max` limit and `Math.max(min, ...)` to ensure the result doesn't fall below the `min` limit.

    const controledMagnitude = magnitude*zoom // adjust magnitude to slow it down;

    let zoom1 = zoomClamp(zoom + (deltaZoom * controledMagnitude));
    const zoomChange = zoom1 - zoom;
    console.info('switched to remote translateCursor this is experimental'); // uncomment //XXX / zoom; if broken

    const panX1 = panX - (cursorX * zoomChange) //XXXDQD / zoom;
    const panY1 = panY - (cursorY * zoomChange) //XXXDQD / zoom;
    const response = { zoom: zoom1, panX: panX1, panY: panY1 };
    return response;
  }

  // #translateCursor(x0,y0){
  //
  //
  //   const localList = this.transforms();
  //
  //   let x1 = x0;
  //   let y1 = y0;
  //   let parentZoom = 1;
  //   let locationX = 0;
  //   let locationY = 0;
  //
  //   for (const [i,t] of localList.entries()) {
  //
  //     // Position of component x
  //     let curX = (t.x) * parentZoom;
  //     locationX = locationX + curX;
  //
  //     // Position of component y
  //     let curY = (t.y) * parentZoom;
  //     locationY = locationY + curY;
  //
  //     // Position of parent's x pan
  //     let curPanX = t.panX * parentZoom;
  //     locationX = locationX + curPanX;
  //
  //     // Position of parent's y pan
  //     let curPanY = t.panY * parentZoom;
  //     locationY = locationY + curPanY;
  //
  //     parentZoom = parentZoom * t.zoom; // set current zoom as parent zoom
  //   }
  //
  //   x1 = x1 - locationX;
  //   y1 = y1 - locationY;
  //
  //   const self = localList[localList.length-1];
  //   const finalZoom = localList.map(o=>o.zoom).reduce((a,c)=>a*c,1)/self.zoom;
  //   x1 = x1/finalZoom
  //   y1 = y1/finalZoom
  //
  //   return [ x1, y1 ];
  // }

}
