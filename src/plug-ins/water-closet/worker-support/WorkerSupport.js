import Signal from 'signal';
import location from 'location';

// import location from 'location';
// import masticator from 'masticator';
// import EventEmittter from 'event-emitter';
// import Signal from 'signal';
import signalMerge from 'signal-merge';

export default Inheritance => class WorkerSupport extends Inheritance {

  workerPath = new Signal();
  WorkerClass = new Signal();
  workerInstance = new Signal();

  async createWorker({attribute}={attribute:"worker"}){
    this.gc = this.workerPath.subscribe(async workerPath=>this.WorkerClass.set((await import(`${location(window.location.href)}/src/worker/${workerPath}/index.js`)).default));
    this.gc = this.workerPath.subscribe(workerPath=>console.log({workerPath}))
    this.gc = this.WorkerClass.subscribe(WorkerClass=>console.log({WorkerClass}))
    this.gc = this.workerInstance.subscribe(workerInstance=>console.log({workerInstance}))
    this.gc = this.WorkerClass.subscribe(WorkerClass=>this.workerInstance.value = new WorkerClass(this.getStage().emitter) )
    this.gc = this.workerInstance.subscribe(workerInstance=> workerInstance.connected() );
    this.gc = ()=>this.workerInstance.value.disconnected(); // .gc will clean up on removeal of element
    return this;
  }











  activateInputPort(selector = `[data-feature="standard-input"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{
      console.log('AAAAAAAAAAAAAAAA', workerInstance);
      this.gc = workerInstance.inputPort.subscribe(v=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = v.showPort?'block':'none'))
    })
    return this;
  }

  activateOutputPort(selector = `[data-feature="standard-output"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{
      this.gc = workerInstance.outputPort.subscribe(v=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = v.showPort?'block':'none'))
      this.gc = workerInstance.outputPort.subscribe(v=> console.log('AAAAA', v))
    })
    return this;
  }

  deactivateIO(selector = `[data-feature="standard-io"]`){
    this.gc = this.workerInstance.subscribe(workerInstance=>{

    const merged = signalMerge({ inputPort: workerInstance.inputPort, outputPort: workerInstance.outputPort }, this.subscriptions);
    const subscription = merged.subscribe(o=>{
      console.log('OOO', o);
      const bothInActive = o.inputPort.showPort===false&&o.outputPort.showPort===false;
      this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.style.display = bothInActive?'none':'block');
    })
    this.subscriptions.push( {type:'signal-merge', id:selector, subscription} );
    })

    return this;
  }

  renderViewParameters(){
    console.warn('TODO: renderViewParameters');

    this.gc = this.workerInstance.subscribe(workerInstance=>{
      console.log('TODO!!!!', workerInstance.parameters);
    })

    return this;
  }

}
