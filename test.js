#!/usr/bin/env node

class WorkQueue {
  #jobs = [];

  addJob(job) {
    this.#jobs.push(job);
  }

  async *processJobs() {
    for (const job of this.#jobs) {
      const result = await job();
      yield result;
    }
  }
}

// Simulated asynchronous job function
const simulatedJob = (id, delay = 1000) => {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(`Job ${id} completed`), delay)
    );
};

// Test the WorkQueue class
(async () => {

  const queue = new WorkQueue();

  // Adding simulated jobs to the queue
  queue.addJob(simulatedJob(1, 500));
  queue.addJob(simulatedJob(2, 1000));
  queue.addJob(simulatedJob(3, 1500));

  // Execute and get results
  for await (const result of queue.processJobs()) {
    console.log(result);
  }

})();
