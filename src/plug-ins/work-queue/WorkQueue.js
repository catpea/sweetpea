export default class WorkQueue {
  #jobs = [];
  #isRunning = false;

  addJob(job) {
    this.#jobs.push(job);
  }

  async start() {
    this.#isRunning = true;
    while (this.#isRunning) {
      if (this.#jobs.length > 0) {
        const job = this.#jobs.shift(); // Get the first job in the queue
        const result = await job();
        console.log(result);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for 500ms before checking again
      }
    }
  }

  stop() {
    this.#isRunning = false;
  }
}
//
// // Simulated asynchronous job function
// const simulatedJob = (id, delay = 1000) => {
//   return () =>
//     new Promise((resolve) =>
//       setTimeout(() => resolve(`Job ${id} completed`), delay)
//     );
// };
//
// // Test the WorkQueue class
// (async () => {
//   const queue = new WorkQueue();
//
//   // Start processing jobs
//   queue.start();
//
//   // Asynchronously add jobs to the queue
//   setTimeout(() => queue.addJob(simulatedJob(1, 500)), 500);
//   setTimeout(() => queue.addJob(simulatedJob(2, 1000)), 1000);
//   setTimeout(() => queue.addJob(simulatedJob(3, 1500)), 1500);
//
//   // Stop the queue after 5 seconds
//   setTimeout(() => queue.stop(), 5000);
// })();
