import System from '../../System.js';
import Drag from './Drag.js';

export default class FireSystem extends System {

  installServices(){
    if(! this.host.hasAttribute('use')) return this;
    const requested = this.host.getAttribute('use').split(/\W/);
    for (const serviceName of requested) {
      const installerName = `install` +  serviceName.charAt(0).toUpperCase() + serviceName.slice(1).toLowerCase();
      if(installerName in this) this[installerName]();
    }
    return this;
  }

  installDrag(){
    //console('Installing Drag');

    const options = {
      handle: this.host.querySelector('.drag-handle'),
      change: ({dx,dy})=>{
        this.host.style.left = parseFloat(this.host.style.left) + dx + 'px';
        this.host.style.top = parseFloat(this.host.style.top) + dy + 'px';
      }
    };

    //console(options);
    const drag = new Drag(options);
    this.subscriptions.push( {type:'use/Drag', id:this.host.getAttribute('id'), subscription:()=>drag.destroy()} );

    return this;
  }

}
