export default class WorkQueue {
  #queue;
  #isProcessing;

  constructor() {
    this.#queue = [];
    this.#isProcessing = false;
  }

  // --- public

  enqueue(task) {
    this.#queue.push(task);
    if (!this.#isProcessing) this.#processQueue();
  }

  size() {
    return this.#queue.length;
  }

  clear() {
    this.#queue = [];
  }

  // --- internal

  #dequeue() {
    return this.#queue.length > 0 ? this.#queue.shift() : null;
  }

  async #processQueue() {
    this.#isProcessing = true;

    while (this.#queue.length > 0) {
      const task = this.#dequeue();
      if (task) {
        try {
          await task();
        } catch (e) {
          console.error('Error processing task:', e);
        }
      }
    }
    this.#isProcessing = false;
  }
}
