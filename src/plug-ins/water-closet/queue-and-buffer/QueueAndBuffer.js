import WorkQueue from 'work-queue';
import WorkBuffer from 'work-buffer';

export default Inheritance => class QueueAndBuffer extends Inheritance {

  queue  = new WorkQueue();
  buffer = new WorkBuffer();

}
