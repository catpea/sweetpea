export default class List {
  #value = [];
  #subscribers;

  constructor() {
    this.#subscribers = [];
  }

  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function.');
    }
    this.#subscribers.push(callback);

    // Instantly return current value
    callback(this.#value);

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

  [Symbol.iterator]() {
    return this.#value[Symbol.iterator]();
  }

  find(callback) {
    if(typeof callback !== "function") throw new TypeError("Needs a function.");
    return this.#value.find(callback);
  }

  pop() {
    const response = this.#value.pop();
    this.notify();
    return response;
  }

  push(value) {
    const response = this.#value.push(value);
    this.notify();
    return response;
  }

  get length(){
    return this.#value.length
  }

  get() {
    return this.#value;
  }

}
