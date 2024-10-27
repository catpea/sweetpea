
class Actor {
  // Private fields
  #mailbox = [];
  #currentBehavior = null;
  #defaultBehavior = null;

  constructor(initialBehavior) {
    // Initialize instance with a default behavior
    this.#defaultBehavior = initialBehavior || this.defaultReceive;
    this.#currentBehavior = this.#defaultBehavior;
    this.preStart();
  }

  // Lifecycle method called before the actor begins processing messages
  preStart() {
    console.log('Actor is starting.');
  }

  // Lifecycle method called after the actor stops
  postStop() {
    console.log('Actor has stopped.');
  }

  // Core method for receiving messages
  receive(message) {
    if (this.#currentBehavior) {
      this.#currentBehavior.call(this, message);
    } else {
      console.log('No behavior defined to handle message:', message);
    }
  }

  // Default message handler if none is provided
  defaultReceive(message) {
    console.log('Handling message with default behavior:', message);
  }

  // Method to change the actor's behavior
  become(newBehavior) {
    this.#currentBehavior = newBehavior;
    console.log('Behavior changed.');
  }

  // Method to revert to default behavior
  unbecome() {
    this.#currentBehavior = this.#defaultBehavior;
    console.log('Reverted to default behavior.');
  }

  // Simulated method to send messages to this actor
  send(message) {
    // Add incoming messages to the private mailbox
    this.#mailbox.push(message);
    console.log('Message sent:', message);
  }

  // Internal method to process messages in the mailbox
  processMessages() {
    while (this.#mailbox.length > 0) {
      const message = this.#mailbox.shift();
      this.receive(message);
    }
  }

  // Stops actor, invoking cleanup
  stop() {
    this.postStop();
  }


  // this.listenTo(stage.director, 'play', this.executeFetch);
  listeningTo = [];
  listenTo(actorInstance, eventName, methodHandler){
    const unsubscribe = actorInstance.on(eventName, methodHandler);
    listeningTo.push({unsubscribe});
  }
  //
}


export class Supervisor extends Actor {}
export class Worker extends Actor {}
