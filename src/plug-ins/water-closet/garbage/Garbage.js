import EventEmitter from 'event-emitter';

export default Inheritance => class Garbage extends Inheritance {

  subscriptions = []; // {type:'list/item/value', id:'', run}
  collectGarbage(){
    this.subscriptions.map(s=>s.subscription())
  }

  set gc(subscription){ // shorthand for component level garbage collection
    this.subscriptions.push( {type:'gc-standard', id:'gc-'+this.subscriptions.length, subscription} );
  }
}
