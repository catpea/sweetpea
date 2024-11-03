import cloneDeep from 'cloneDeep';
import isEqual from 'isEqual';

export default class Signal {
  #value;
  #subscribers;

  constructor(value) {
    this.#value = value;
    this.#subscribers = [];
  }

  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function.');
    }
    this.#subscribers.push(callback);

    // Instantly return current value
    if(this.#value !== undefined) callback(this.#value);

    // Return an unsubscribe function for convenience
    return () => this.unsubscribe(callback);
  }

  unsubscribe(callback) {
    const index = this.#subscribers.indexOf(callback);
    if (index > -1) {
      this.#subscribers.splice(index, 1);
    }
  }

  notify() {
    this.#subscribers.forEach(callback => {
      try {
        callback(this.#value);
      } catch (error) {
        /////console.error('Error executing subscriber callback:', error);
      }
    });
  }


  set(value) {
    const oldValue = this.#value;
    this.#value = value;
    // console.log('SET', isEqual(oldValue, this.#value), oldValue, this.#value);
    if(!isEqual(oldValue, this.#value)) this.notify();
  }

  alter(f) { // operates on instances
    const oldValue = cloneDeep(this.#value);
    f(this.#value);
    const newValue = this.#value;
    if(!isEqual(oldValue, newValue)){
      this.#value = newValue;
      this.notify();
    }
  }

  prop(key, value) { // operates on instances
    const oldValue = this.#value[key];
    const newValue = value;
    if(!isEqual(oldValue, newValue)){
      this.#value[key] = newValue;
      this.notify();
    }
  }

  get() {
    return this.#value;
  }

  get value() {
    return this.#value;
  }

  set value(v) {
    this.set(v);
  }
}
