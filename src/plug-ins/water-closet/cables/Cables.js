import EventEmitter from 'event-emitter';
import cableStore from 'cable-store';
import Signal from 'signal';

export default Inheritance => class Data extends Inheritance {
  cables;
  constructor(...a) {
    super(...a);
    this.cables = cableStore(this);
    this.gc =()=> this.cables.destroy();
  }
}
