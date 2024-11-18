import EventEmitter from 'event-emitter';

export default Inheritance => class VisualProgramming extends Inheritance {

  createSupervisor({x,y,initialFace, supervisor, worker, flow}){
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

    const supervisorElement = document.createElement(`${VPL_ELEMENT_PREFIX}-super`);
    supervisorElement.setAttribute('id', this.guid());
    supervisorElement.setAttribute('x', x);
    supervisorElement.setAttribute('y', y);

    supervisorElement.setAttribute('supervisor', supervisor);
    supervisorElement.setAttribute('worker', worker);
    supervisorElement.setAttribute('flow', flow);

    stage.appendChild(supervisorElement);
    if(initialFace) supervisorElement.instance.initialFace = initialFace;

  }

}
