import Signal from 'signal';

export default Inheritance => class ComponentEvents extends Inheritance {
  state = new Signal(null);


  dispatchReady(){
    this.state.set('ready');
    const event = new CustomEvent('ready', {
        detail: { message: 'ready!' },
        bubbles: true,
        composed: true
    });
    this.host.dispatchEvent(event);
    return this;
  }

  dispatchBusy(){
    this.state.set('busy');
    const event = new CustomEvent('busy', {
        detail: { message: 'busy!' },
        bubbles: true,
        composed: true
    });
    this.host.dispatchEvent(event);
    return this;
  }

  dispatchIdle(){
    this.state.set('idle');
    const event = new CustomEvent('idle', {
        detail: { message: 'idle!' },
        bubbles: true,
        composed: true
    });
    this.host.dispatchEvent(event);
    return this;
  }

  dispatchExit(){
    this.state.set('exit');
    const event = new CustomEvent('exit', {
        detail: { message: 'exit!' },
        bubbles: true,
        composed: true
    });
    this.host.dispatchEvent(event);
    return this;
  }








  async awaitStageReady(){

    const stage = this.getStage().instance;
    const promise = new Promise(resolve => {
      // this.gc = stage.state.subscribe(state=>console.log('WWW-state->', state))
      this.gc = stage.state.subscribe(state=>state=='ready'?resolve():null)
    });
    // console.log('WWW WAITING');
    await promise;
    // console.log('WWW FINISHED WAITING');
    return this;
  }
  

}
