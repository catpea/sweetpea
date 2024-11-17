import Signal from 'signal';

export default class CableStore {

  #cables = {};

  ensureCable(name) {
    if (!this.#cables[name]) this.#cables[name] = new CableList();
    return this.#cables[name];
  }

  getCable(name) {
    return this.ensureCable(name);
  }

  destroy() {
    // NOOP, runs when cabe is removes
  }

}

class CableList {
  #elements = [];

  add(programId, portId){
    this.#elements.push([programId, portId]);
  }
  remove(programId, portId){
    this.#elements = this.#elements.filter(o=>this.compare(...o,programId, portId));
  }
  compare(a, b, c, d) {
    return a===c&&b===d
  }
  get count(){
    return this.#elements.length;
  }
}
