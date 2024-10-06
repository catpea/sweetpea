import EventEmitter from 'event-emitter';

export default Inheritance => class Garbage extends Inheritance {

  subscriptions = []; // {type:'list/item/value', id:'', run}
  collectGarbage(){
    this.subscriptions.map(s=>s.subscription())
  }
}
