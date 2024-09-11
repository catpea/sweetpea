export default class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Register an event handler
    on(event, listener) {
      console.log('Subscriber', event);
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return ()=>this.removeListener(event, listener);
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
      console.log('Emitting...', event, args);
        if (this.events[event]) {
            this.events[event].forEach(listener => {
                listener(...args);
            });
        }
    }

    // Remove a specific listener
    removeListener(event, handlerToRemove) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(handler => handler !== handlerToRemove);
        }
    }


    // Remove all listeners for a specific event
    removeAllListeners(event = null) {
        if (event) {
            if (this.events[event]) {
                delete this.events[event];
            }
        } else {
            // Remove all listeners for all events
            this.events = {};
        }
    }

    off(...a){
      this.removeListener(...a)
    }
    destroy(){
      this.removeAllListeners();
    }
}
