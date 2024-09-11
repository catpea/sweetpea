import { svg, update } from "/plug-ins/domek/index.js"
const uuid = bundle['uuid'];

import Drag from "/plug-ins/mouse-services/Drag.js";

class Connect extends Drag {

  line;
  geometry = { x1: 0, y1: 0, x2: 0, y2: 0, };

  before(){
    this.line = svg.line({
      class: 'editor-anchor-line',
      style: {
        'pointer-events': 'none' /* required, otherwise the line will mousedrop on it self */
      },
      'vector-effect': 'non-scaling-stroke',
    });

    this.geometry = {
      x1: this.component.x,
      y1: this.component.y,
      x2: this.component.x, // 0 length line
      y2: this.component.y, // 0 length line
    };
    this.scene.appendChild(this.line);
  }

  movement({x,y}){
    let dx = this.geometry.x2 - x;
    let dy = this.geometry.y2 - y;
    this.geometry = {
      x1: this.component.x,
      y1: this.component.y,
      x2: dx,
      y2: dy,
    };
    update(this.line, this.geometry);
  }

  after({e}){

    //NOTE: Remove the line before returning from over-self

    if(this.line) this.scene.removeChild(this.line);
    this.line = undefined;

    const isOverSelf = e.target == this.handle;
    if(isOverSelf) return;

    const isOverAnotherPort = e?.target?.classList?.contains('editor-socket-pad');
    const isOverBackground = e?.target?.classList?.contains('viewport-background');

    if(isOverAnotherPort){
      const control = e.target.dataset.control;
      const port = e.target.dataset.port;

      this.component.getApplication().realm.createNode({
        id: uuid(),
        type: 'Pipe',

        from: this.component.control.id,
        out: this.component.name,
        to: control,
        in: port,
      });

    }

  }

}

export default Connect;
