import EventEmitter from 'event-emitter';

export default Inheritance => class VisualProgramming extends Inheritance {

  createSupervisor({x,y,initialFace}){
    const stage = this.getStage();

    // If x or y are missing set coordinates to middle of the screen
    if(x===undefined||y===undefined){
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
    }

    const supervisor = document.createElement(`${globalThis.sweetpea.prefix}-super`);
    supervisor.setAttribute('id', this.guid());
    supervisor.setAttribute('x', x);
    supervisor.setAttribute('y', y);
    supervisor.setAttribute('template', 'user/note');

    stage.appendChild(supervisor);
    if(initialFace) supervisor.instance.initialFace = initialFace;

  }

}
