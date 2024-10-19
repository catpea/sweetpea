import Movable from './mouse/Movable.js';
import Connectable from './mouse/Connectable.js';
import Selectable from './mouse/Selectable.js';

export default Inheritance => class UseAttribute extends Inheritance {

  extensions = {
    movable:     Movable,
    connectable: Connectable,
    selectable:  Selectable,
  };

  useExtensions(){

    const elements = this.search('*[use]');
    for (const element of elements) {
      const extensions = element.getAttribute('use').split(/ /);
      for (const extension of extensions) {
        if(!this.extensions[extension]) {
          continue;
          throw new TypeError(`Unknown extension ${extension}`)
        }
        const ext = new this.extensions[extension](element, this);
        ext.connectedCallback();
        this.subscriptions.push( {type:'use/ext/disconnectedCallback', id:extension, subscription:()=>ext.disconnectedCallback()} );
      }
    }
    return this;
  }

}
