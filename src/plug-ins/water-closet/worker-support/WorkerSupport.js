import Signal from 'signal';

export default Inheritance => class WorkerSupport extends Inheritance {

  worker = new Signal();

}
