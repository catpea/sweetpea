export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  stats() {
    return Object.fromEntries(Object.entries(this.events).map(([name, listeners])=>[name,listeners.length]))
  }

  // Register an event handler
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  // Register a one-time event handler
  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.removeListener(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  // Trigger an event
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => {
        listener(...args);
      });
    }
    if (this.events["*"]) {
      this.events["*"].forEach((listener) => {
        listener(event, ...args);
      });
    }
  }

  // Remove a specific listener
  removeListener(event, handlerToRemove) {
    // console.log(`removeListener`, event)
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        (handler) => handler !== handlerToRemove,
      );
    }
  }

  // Remove all listeners for a specific event
  removeAllListeners(event = null) {
    if (event) {
      if (this.events[event]) {
        // console.log(`removeAllListener`, event)
        delete this.events[event];
      }
    } else {
      // Remove all listeners for all events
      // Object.keys(this.events).map(o=>console.log(`removeAllListener`, o))
      this.events = {};
    }
  }

  send(...a) {
    this.emit(...a);
  }
  off(...a) {
    this.removeListener(...a);
  }
  destroy() {
    this.removeAllListeners();
  }
}
