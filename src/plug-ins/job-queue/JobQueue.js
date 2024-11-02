import EventEmitter from 'event-emitter';
import Signal from 'signal';

export default class JobQueue  extends EventEmitter {
  count = new Signal(0);
  total = new Signal(0);
  #list = [];
  constructor() {
    super()
  }
  enqueue(job) {
    if(!job) throw new Error('Job is a required prameter');

    this.#list.push(job);
    this.count.set(this.#list.length);
    this.total.alter(v=>v+1);
    this.emit('enqueue', job);
  }
  dequeue() {
    this.#list.shift(job);
    this.count.set(this.#list.length);
    this.emit('dequeue', job);
  }
  remove(id){
    this.#list.splice(this.#list.findIndex(o => o.id === id), 1);
    this.count.set(this.#list.length);
  }
  [Symbol.iterator]() {
    return this.#list[Symbol.iterator]();
  }
}
