import WorkQueue from 'work-queue';

export default class AutomaticTransmission {

  queue = new WorkQueue();

  constructor(states, initialState) {
    this.states = states;
    this.currentState = '/';
    this.queue.start();

    this.shift(initialState);



  }

  stop(){
      this.queue.stop();
  }

  validateState(state) {
    console.info('state', this.currentState, state);
    if (!this.states[state]) {
      throw new Error(`State "${state}" is not defined.`);
    }
  }

  shift(toState) {
    this.queue.addJob(()=>this.shift2(toState));



  }

  async shift2(toState) {
    this.validateState(toState);
    const fromState = this.currentState;

    console.log('BEGIN STATE TRANSITION', fromState, toState);
    if(fromState == toState) return


    const traverse = this.relative(fromState, toState);
    console.log(traverse);

    if (traverse.exit) {
      for (const location of traverse.exit) {
        if(this.states[location].exit) await this.states[location].exit();
      }
    }

    if (traverse.enter) {
      for (const location of traverse.enter) {
        if(this.states[location].enter) await this.states[location].enter();
      }
    }

    this.currentState = toState;
    console.log('STATE TRNSITIONED', this.currentState);
  }

  getCurrentState() {
    return this.currentState;
  }

  getStateInfo() {
    return this.states[this.currentState];
  }

  // HISTORICALLY, the original
  // relative(from, to){
  //   const fromSplit = from.split(/\/+/).filter(o=>o.trim().length);
  //   const toSplit = to.split(/\/+/).filter(o=>o.trim().length);
  //   if (fromSplit.join() === toSplit.join()) return '';
  //   const fullFrom = fromSplit.reduce( (accumulator,currentValue,currentIndex)=>{ accumulator.unshift( '/'+fromSplit.slice(0, fromSplit.length-currentIndex).join('/') ); return accumulator; }, [])
  //   const fullTo = toSplit.reduce( (accumulator,currentValue,currentIndex)=>{ accumulator.unshift( '/'+toSplit.slice(0, toSplit.length-currentIndex).join('/') ); return accumulator; }, [])
  //   const exit = [...fullFrom.entries()].filter(([i,v])=>v!==fullTo[i]).map(([i,v])=>v).reverse();
  //   const enter = [...fullTo.entries()].filter(([i,v])=>v!==fullFrom[i]).map(([i,v])=>v);
  //   return {exit, enter}
  // }

  relative(from, to) {
    // Split the 'from' path into parts based on the '/' delimiter and remove any empty parts.
    const fromSplit = from.split(/\/+/).filter(o => o.trim().length);

    // Split the 'to' path into parts based on the '/' delimiter and remove any empty parts.
    const toSplit = to.split(/\/+/).filter(o => o.trim().length);

    // Check if both paths are the same. If they are, return an empty string.
    if (fromSplit.join() === toSplit.join()) return '';

    // Create an array of "paths" that represent all points from the root to each part of the 'from' path.
    const fullFrom = fromSplit.reduce((accumulator, currentValue, currentIndex) => {
      // Build the path from the root to the current index backward and add it to the accumulator list.
      accumulator.unshift('/' + fromSplit.slice(0, fromSplit.length - currentIndex).join('/'));
      return accumulator;
    }, []);

    // Create an array of "paths" that represent all points from the root to each part of the 'to' path.
    const fullTo = toSplit.reduce((accumulator, currentValue, currentIndex) => {
      // Build the path from the root to the current index backward and add it to the accumulator list.
      accumulator.unshift('/' + toSplit.slice(0, toSplit.length - currentIndex).join('/'));
      return accumulator;
    }, []);

    // Create a list of paths to exit the 'from' path to a point where they diverge.
    const exit = [...fullFrom.entries()]
      .filter(([i, v]) => v !== fullTo[i]) // Find where 'from' paths and 'to' paths are different.
      .map(([i, v]) => v) // Get the path from the differing point only.
      .reverse(); // Reverse the order to exit from leaf to root.

    // Create a list of paths to enter from the point of divergence to the final 'to' state.
    const enter = [...fullTo.entries()]
      .filter(([i, v]) => v !== fullFrom[i]) // Find where 'to' paths differ.
      .map(([i, v]) => v); // Get the differing path points.

    // Return the paths needed to exit and enter states as objects.
    return { exit, enter }
  }

}
