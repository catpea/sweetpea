import translateCursor from '/plug-ins/translate-cursor/index.js';

export default class Menu {

  area = window;
  scale = null;
  show = null;
  transforms = null;

  mouseDownHandler;
  mouseMoveHandler;
  mouseUpHandler;

  constructor({area, scale, show, transforms}){
    this.area = area;
    this.scale = scale;
    this.show = show;
    this.transforms = transforms;


    this.#mount();
  }

  #mount(){

    this.contextMenuHandler = (e) => {
      const isAllowed = e.target?.classList.contains("viewport-background");
      if(!isAllowed) return;

      e.preventDefault();
      e.stopPropagation();

      let x = e.clientX;
      let y = e.clientY;

      let [tx,ty] = translateCursor(x,y, this.transforms());


      this.show({x,y,tx,ty});

    };

    this.area.addEventListener('contextmenu', this.contextMenuHandler);
  }

  destroy(){
    this.area.removeEventListener('contextmenu', this.contextMenuHandler);
  }

}
