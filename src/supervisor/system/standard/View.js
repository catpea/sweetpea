import Signal from 'signal';
import cloneDeep from 'cloneDeep';

function interpolate(t, c){return t.replace(/\${([^}]+)}/g,(m,p)=>p.split('.').reduce((a,f)=>a?a[f]:undefined,c)??'');}

export default class View {

  #garbage = [];

  workerPath;
  #WorkerClass = new Signal();
  #workerInstance = new Signal();
  parameters = new Signal();

  stage;
  core;
  root;
  data;
  pipe;

  constructor({workerPath, stage, core, root, pipe, data}){
    this.workerPath = workerPath; // this is a signal
    console.log('OOO supervisor View constructor!');

    this.stage = stage;
    this.core = core;
    this.root = root;
    this.pipe = pipe;
    this.data = data;

    const currentUrl = new URL(window.location.href);

    this.workerPath.subscribe(async workerPath=>this.#WorkerClass.set((await import(`${currentUrl.pathname}src/worker/${workerPath}/index.js`)).default));

    this.workerPath.subscribe(workerPath=>{
      this.core.host.shadowRoot.querySelector('[data-render=title]').innerText = workerPath;
    });

    this.#WorkerClass.subscribe(WorkerClass=>this.#workerInstance.set(new WorkerClass()))
    this.#WorkerClass.subscribe(WorkerClass=>this.parameters.set(cloneDeep(WorkerClass.parameters)))
    this.#workerInstance.subscribe(workerInstance=>{ });

    this.parameters.subscribe(parameters=>{
      // prepare signals
      for (const parameter of parameters) {
        parameter.value = new Signal(parameter.default);
        const subscription = parameter.value.subscribe(v=>this.renderParameters())
        this.#garbage.push({subscription})
      }
    });
  }

  renderParameters(){
    const template = this.core.host.shadowRoot.getElementById('parameters');
    const element = this.core.host.shadowRoot.querySelector('[data-render=parameters]');
    element.replaceChildren();

    for (const parameter of this.parameters.get()) {

      const content = template.content.cloneNode(true);
      const templateType = this.core.host.shadowRoot.getElementById(`parameters-${parameter.type}`);
      const contentType = templateType.content.cloneNode(true);
      content.querySelector('slot').parentNode.appendChild(contentType);

      const bindings = content.querySelectorAll('[data-bind]');

      for (const binding of bindings) {
        const [name, attribute] = binding.dataset.bind.split('@');
        const value = parameter[name]
        console.log('OOO', name, value);
        switch (binding.tagName) {
          case 'INPUT':
            binding.value = value?.subscribe?value.get():value;
          case 'B':
            console.log('B');
          default:
            if(attribute){
              const template = binding.dataset.bindTemplate;
              if(template){
                console.warn('TODO: template literals htmlz`` ');
                const data = {[name]:value};
                const result = interpolate(template, data);
                console.log('OOO', {attribute, data, result, template});
                binding.setAttribute(attribute, result);

              }else{
                binding.setAttribute(attribute, value);
              }
            }else{
              binding.innerText = value;
            }
        } // switch
      } // for

      element.appendChild(content);

    }
  } // fun render

  mount(){
  }

  destroy(){
    this.#garbage.map(o=>o.subscription())
  }

  flip(card){
    this.core.flipTo(card);
  }

}
