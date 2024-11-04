import JobQueue from 'job-queue';
import JobBuffer from 'job-buffer';
import interpolate from 'interpolate';
import signalMerge from 'signal-merge';

export default Inheritance => class QueueAndBuffer extends Inheritance {

  queue  = new JobQueue();
  buffer = new JobBuffer();

  liveQueueStats(selector=".in-info"){
    const merged = signalMerge({ count: this.queue.count, total: this.queue.total }, this.subscriptions);
    const subscription = merged.subscribe(o=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.innerHTML = interpolate(el.dataset.template, o)))
    // merged.subscribe(o=> console.log('CCC merged', o ))
    this.subscriptions.push( {type:'signal-merge', id:selector, subscription} );
    return this;
  }

  liveBufferStats(selector=".out-info"){
    const merged = signalMerge({ count: this.buffer.count, total: this.buffer.total }, this.subscriptions);
    const subscription = merged.subscribe(o=>this.host.shadowRoot.querySelectorAll(selector).forEach(el=>el.innerHTML = interpolate(el.dataset.template, o)))
    this.subscriptions.push( {type:'signal-merge', id:selector, subscription} );
    return this;
  }

}
