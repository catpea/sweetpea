export default class StateMachine {
  constructor(states, initialState) {
    this.states = states; // An object where keys are state names and values are state objects
    this.currentState = initialState;
    this.validateState(this.currentState);
    this.transition(this.currentState);
  }

  validateState(state) {
    if (!this.states[state]) {
      throw new Error(`State "${state}" is not defined.`);
    }
  }

  transition(toState) {
    this.validateState(toState);

    const fromState = this.currentState;
    if (this.states[fromState].exit) {
      this.states[fromState].exit();
    }

    if (this.states[toState].enter) {
      this.states[toState].enter();
    }

    this.currentState = toState;
  }

  getCurrentState() {
    return this.currentState;
  }

  getStateInfo() {
    return this.states[this.currentState];
  }
}
