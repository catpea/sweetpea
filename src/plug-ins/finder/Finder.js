import { html } from 'htl';
import macro from 'async-macro';
import AutomaticTransmission from 'automatic-transmission';

export default class FinderElement extends HTMLElement {
  instance;

  constructor() {
    super();
    this.instance = new Finder(this);
  }
  connectedCallback() {
    this.instance.transmission.shift('/connected');
  }
  disconnectedCallback() {
    this.instance.transmission.shift('/disconnected');
  }

}

// -- //

class Finder {

  host;
  transmission;
  templates;

  constructor(host) {
    this.host = host;
    const gearbox = {
      '/init':{
        enter: async () => await this.macro.initialize.run()
      },
      '/connected':{
        enter: async () => await this.macro.display.run()
      },
    }
    this.transmission = new AutomaticTransmission(gearbox, '/init');
  }

  // -- //
  get macro() {
    return macro(this);
  }

  async initialize() {
    this.host.attachShadow({ mode: "open" });
    this.host.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
  }
  async display() {

    const state = {
      panes: [
        {
          icon:'house-heart',
          label: 'Architecture',
          directories: [
            { id: 'home', label: 'Home', icon: 'house' },
            { id: 'elements', label: 'Stage Elements', icon: 'code-slash' },
            { id: 'wc-traits', label: 'Traits', icon: 'upc-scan' },
          ],
        },
        {
          icon:'cup-hot',
          label: 'Traits',
          directories: [
            { id: 'element-search', label: 'Element Search', icon: 'braces-asterisk' },
            { id: 'flow-support', label: 'Flow Support', icon: 'braces-asterisk' },
            { id: 'worker-support', label: 'Worker Support', icon: 'braces-asterisk' },
          ],
        },
        {
          icon:'hdd-rack',
          label: 'Worker Support',
          directories: [
            { id: 'createworker', label: 'createWorker()', icon: 'box-seam-fill' },
            { id: 'installworkerindex', label: 'installWorkerIndex()', icon: 'box-seam-fill' },
            { id: 'listworkercategories', label: 'listWorkerCategories()', icon: 'box-seam-fill' },
            { id: 'listworkercategoryworkers', label: 'listWorkerCategoryWorkers()', icon: 'box-seam-fill' },
            { id: 'renderworkerviewparameters', label: 'renderWorkerViewParameters()', icon: 'box-seam-fill' },
          ],
        },

      ]
    };





    const panes = state.panes.map(pane => html`
        <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">

            <div class="d-flex align-items-center mb-3 text-white text-decoration-none">
            <i class="bi bi-${pane.icon} fs-3 me-2"></i>
            <span class="fs-4">${pane.label}</span>
            </div>

            <ul class="nav nav-pills flex-column mb-auto">
                ${pane.directories.map(({ id, label, icon }) => html`
                <li class="nav-item">
                    <a href="#${id}" class="nav-link" aria-current="page"><i class="bi bi-${icon}"></i> ${label}</a>
                </li>`)}
            </ul>
        </div>`);

      const container = html`
      <div class="d-flex flex-nowrap">
        ${panes}
      </div>
      `;


    // let id = this.host.getAttribute('id');
    // const bork = html`<div></div>`
    // let c = 0;

    // setInterval(() => {
    //   bork.innerHTML = c++;
    // },1_000)

    this.host.shadowRoot.append(container);

  }
}
