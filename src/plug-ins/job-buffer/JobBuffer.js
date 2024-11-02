import EventEmitter from 'event-emitter';
import Signal from 'signal';

export default class JobQueue  extends EventEmitter {
  count = new Signal(0);
  total = new Signal(0);
  #list = [];
  constructor() {
    super()
  }
  enbuffer(job) {
    if(!job) throw new Error('Job is a required prameter');

    this.#list.push(job);
    this.count.set(this.#list.length);
    this.total.alter(v=>v+1);
    console.log('VVV JOB', job);
    console.log('VVV TOTAL', this.total.value);
    this.emit('enbuffer', job);
  }
  debuffer() {
    this.#list.shift(job);
    this.count.set(this.#list.length);
    this.emit('debuffer', job);
  }
  remove(id){
    this.#list.splice(this.#list.findIndex(o => o.id === id), 1);
    this.count.set(this.#list.length);
  }
  [Symbol.iterator]() {
    return this.#list[Symbol.iterator]();
  }
}
