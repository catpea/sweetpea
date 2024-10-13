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
    toState = toClass(toState, true);
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

function toClass(str, lower=true) {
  console.log([...str.split(/[^a-z0-1)]/i).entries()]);
  return [...str.split(/[^a-z0-1)]/i).entries()]
  .map(([index, word]) => (index==0&&lower?word.charAt(0).toLowerCase():word.charAt(0).toUpperCase()) + word.slice(1).toLowerCase()) // Capitalize first letter
  .join(''); // Join without spaces
}
