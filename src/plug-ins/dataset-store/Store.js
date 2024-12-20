import Signal from 'signal';

export default class DataStore {
  signals = {};
  #el;
  #observer;

  constructor(el) {
    this.#el = el;

    const callback = (mutationList, observer) => {
      // console.log(mutationList);

      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          // console.log(`mutation.attributeName: ${mutation.attributeName}`)
          if (mutation.attributeName.startsWith('data-')) {
            const [,key] = mutation.attributeName.split('-');
            console.log({key}, Object.entries(this.signals));

            const incomingValue = mutation.target.getAttribute(mutation.attributeName);
            const signalObject = Object.entries(this.signals).find(([k, v]) => key == k.toLowerCase());
            if (!signalObject) return console.warn(`mutation.attributeName ${mutation.attributeName} was not in a dataset-store`);

            const signalValue = signalObject.value;
            // console.log(`The ${mutation.attributeName} attribute was modified`);
            if (incomingValue !== signalValue){
              console.info('External attribute modification', {incomingValue, signalValue})
              signalObject.value = incomingValue;
            }

          }
        }
      }
    };
    this.#observer = new MutationObserver(callback);
    this.#observer.observe(this.#el, { attributes: true });
  }

  subscriptions = [];
  collectGarbage(){
    this.subscriptions.map(s=>s.subscription())
  }

  set gc(subscription){ // shorthand for component level garbage collection
    this.subscriptions.push( {type:'gc-standard', id:'gc-'+this.subscriptions.length, subscription} );
  }

  destroy() {
    this.#observer.disconnect();
    this.collectGarbage();
  }






  ensureSignal(key) {
    const missing = !this.signals[key];

    if (missing) {
      let initialValue = this.#el.getAttribute(`data-${key}`);
      if (initialValue === "") initialValue = undefined;
      this.signals[key] = new Signal(initialValue);
    }

    this.gc = this.signals[key].subscribe(v => {
      if (v !== this.#el.getAttribute(`data-${key}`)) this.#el.setAttribute(`data-${key}`, v);
    })

    return this.signals[key];
  }
  getSignal(key) {
    return this.ensureSignal(key);
  }
  updateSignal(key, value) {
    this.ensureSignal(key).value = value;
    return null;
  }

  parameters() {
    const response = {};
    for (const key in this.signals) {
      response[key] = this.signals[key].value;
    }
    return response;
  }

}
