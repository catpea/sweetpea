import EventEmitter from 'event-emitter';
import Signal from 'signal';

export default Inheritance => class Db extends Inheritance {

  dbProxy;
  dbSignals = {};

  db(id){

    console.log('XXX', this.constructor.name);
    const stage = this.getStage();

    console.log(stage, [...stage.children].map(o=>o.getAttribute('id')), [...stage.children].find(o=>o.getAttribute('id')===id), stage.getElementById);
    const element = [...stage.children].find(o=>o.getAttribute('id')===id)

    const ensure = (element, signalName) => {

      if(!element.instance.dbSignals[signalName]){
        const signal = new Signal();
        element.instance.dbSignals[signalName] = signal;
        const subscription = signal.subscribe(v=>{
          if(element.hasAttribute(signalName)){
            // exists
            if(element.getAttribute(signalName) == v){
              //noop
            }else{
              element.setAttribute(signalName, v)
            }
          }else{
            // attribute does not exist
            element.setAttribute(signalName, v)
          }
        });
        this.subscriptions.push( {type:'attribute-signal', id:signalName, subscription} );
      }
      return element.instance.dbSignals[signalName];
    }

    const handler2 = {
      get(x, signalName, receiver) {
        return ensure(element, signalName);
      },
      set(x, signalName, value) {
        ensure(element, signalName).set(value);
        return true;
      },
    };

    if(!element.instance.dbProxy) element.instance.dbProxy = new Proxy({}, handler2)

    return element.instance.dbProxy;

  }

}
