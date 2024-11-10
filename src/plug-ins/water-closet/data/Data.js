import EventEmitter from 'event-emitter';
import datasetStore from 'dataset-store';
import Signal from 'signal';

export default Inheritance => class Data extends Inheritance {
  data;
  constructor(...a) {
    super(...a);

    this.data = datasetStore(this.host);
    this.gc =()=> this.data.destroy();

    // console.log('data initialized');
  }
}
