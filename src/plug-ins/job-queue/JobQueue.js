import EventEmitter from 'event-emitter';

export default class JobQueue  extends EventEmitter {
  #queue;

  constructor() {
    super()
    // Initialize an empty queue to store completed jobs
    this.#queue = [];
  }

  [Symbol.iterator]() {
    return this.#queue[Symbol.iterator]();
  }

  // Method to add completed jobs to the queue
  enqueue(job) {
    this.#queue.push(job); // adds one or more elements to the end of an array
    this.emit('enqueue', job);

  }
  dequeue() {
    this.#queue.shift(job);
  }
  remove(id){
    console.warn('TODO: remove work bugger item by ID');
  }
  // Method to retrieve all jobs from the queue
  retrieveJobs() {
    // Create a copy of the queue to return
    const jobs = [...this.#queue];
    // Clear the queue
    this.#queue.length = 0;
    return jobs;
  }
}
