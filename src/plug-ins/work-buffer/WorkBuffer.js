import EventEmitter from 'event-emitter';

export default class WorkBuffer  extends EventEmitter {
  #buffer;

  constructor() {
    super()
    // Initialize an empty buffer to store completed jobs
    this.#buffer = [];
  }

  [Symbol.iterator]() {
    return this.#buffer[Symbol.iterator]();
  }

  // Method to add completed jobs to the buffer
  enbuffer(job) {
    this.#buffer.push(job); // adds one or more elements to the end of an array
    this.emit('enbuffer', job);

  }
  debuffer() {
    this.#buffer.shift(job);
  }
  remove(id){
    console.warn('TODO: remove work bugger item by ID');
  }
  // Method to retrieve all jobs from the buffer
  retrieveJobs() {
    // Create a copy of the buffer to return
    const jobs = [...this.#buffer];
    // Clear the buffer
    this.#buffer.length = 0;
    return jobs;
  }
}
