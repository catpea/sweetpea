import Signal from 'signal';

export default class View {

  worker = new Signal();
  #worker = new Signal();

  options = new Signal([]);

  stage;
  core;
  root;
  data;
  pipe;

  constructor({stage, core, root, pipe, data}){

    this.stage = stage;
    this.core = core;
    this.root = root;
    this.pipe = pipe;
    this.data = data;

    this.worker.subscribe(async v=>this.#worker.set(new (await import(`../../worker/${v}/index.js`))))
    this.#worker.subscribe(workerInstance=>{
      const options = [];

      const option = new Object();

      workerInstance.options.forEach(({name, default:value})=>{
        option.name = name;
        option.value = new Signal(value);
      });

      // option.signals={}
      // v.options.forEach(({name})=>{
      //   Object.defineProperty(option, name, {
      //     get: function() {
      //         return name;
      //     },
      //     set: function(x) {
      //         name = x;
      //     }
      //   });
      // })
      options.push(option);

      this.options.set(options);
    })
  }

  mount(){
  }

  destroy(){
  }

  flip(card){
    this.core.flipTo(card);
  }

}
