import EventEmitter from 'event-emitter';

export default Inheritance => class VisualProgramming extends Inheritance {

  createSupervisor(){
    const stage = this.getStage();

    let x = 0;
    let y = 0;
    let {width, height} = stage.getBoundingClientRect();
    let {x:panX,y:panY} = stage.pan;
    let zoom = stage.zoom;
    width = width / zoom;
    height = height / zoom;
    const centerW = width/2;
    const centerH = height/2;
    panX = panX / zoom;
    panY = panY / zoom;
    x = x-panX;
    y = y-panY;
    x = x+centerW;
    y = y+centerH;


    const supervisor = document.createElement(`${globalThis.sweetpea.prefix}-actor`);
    supervisor.setAttribute('id', this.guid());
    supervisor.setAttribute('x', x);
    supervisor.setAttribute('y', y);
    supervisor.setAttribute('template', 'parse');
    stage.appendChild(supervisor);
  }

}
