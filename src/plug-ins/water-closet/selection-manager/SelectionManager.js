import Signal from 'signal';

export default Inheritance => class SelectionManager extends Inheritance {
  //NOTE: selected can be "true" (string) or null (property removed [helps with serialization])

  selected = new Signal(false);

  constructor(...arg){
    super(...arg)
    const subscription = this.selected.subscribe(v=>v?this.#actorSelected():this.#actorUnselected());
    this.subscriptions.push( {type:'svg/line', id:'cable', subscription} );

    // this.selected.subscribe(selected=>//console.log(`${this.host.tagName}#${this.host.getAttribute('id')||'x'}`, {selected}))

  }

  #actorSelected(){
    this.deselectOthers(this.host);
  }
  #actorUnselected(){
  }



  deselectOthers(chosen){
    const others = this.getAllActorsOnStage();
    for (const other of others) {
      if(chosen == other) continue;
      other.setAttribute('selected', "false");
    }
  }

  deselectAll(){
    const actors = this.getAllActorsOnStage();
    for (const actor of actors) {
      actor.setAttribute('selected', "false");
    }
  }

}
