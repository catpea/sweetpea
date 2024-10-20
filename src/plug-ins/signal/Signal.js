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
    console.log('SET', isEqual(oldValue, this.#value), oldValue, this.#value);
    if(!isEqual(oldValue, this.#value)) this.notify();
  }

  alter(f) { // operates on instances
    const oldValue = cloneDeep(this.#value);
    f(this.#value);
    if(!isEqual(oldValue, this.#value)) this.notify();
  }

  get() {
    return this.#value;
  }
}
