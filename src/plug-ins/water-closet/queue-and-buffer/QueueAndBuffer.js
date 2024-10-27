import JobQueue from 'job-queue';
import JobBuffer from 'job-buffer';

export default Inheritance => class QueueAndBuffer extends Inheritance {

  queue  = new JobQueue();
  buffer = new JobBuffer();

}
