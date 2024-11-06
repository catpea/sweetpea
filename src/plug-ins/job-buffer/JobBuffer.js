import EventEmitter from "event-emitter";
import Signal from "signal";

export default class JobBuffer extends EventEmitter {
  count = new Signal(0);
  total = new Signal(0);
  #list = [];
  constructor() {
    super();
  }
  enbuffer(job) {
    if (!job) throw new Error("Job is a required prameter");
    this.#list.push(job);
    this.count.set(this.#list.length);
    this.total.alter((v) => v + 1);
    this.emit("enbuffer", job);
  }
  debuffer() {
    this.#list.shift(job);
    this.count.set(this.#list.length);
    this.emit("debuffer", job);
  }
  remove(job) {
    this.#list.splice(this.#list.indexOf(job), 1);
    this.count.set(this.#list.length);
  }
  [Symbol.iterator]() {
    return this.#list[Symbol.iterator]();
  }
}
