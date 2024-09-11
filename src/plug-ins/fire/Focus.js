// focus manager moves the <g> all the way to the bottom of the paret

import { front } from "/plug-ins/domek/index.js"

export default class Focus {

  component;
	handle;
  element = ()=>{};

	// handlers
	mouseDownHandler;
	mouseUpHandler;

	constructor({ component, handle, element }) {

    if(!component) throw new Error('component is required')
    if(!handle) throw new Error('handle is required')

		this.component = component;
		this.element = element;
		this.handle = handle;
    this.mount();
  }

  mount(){

		this.mouseDownHandler = (e) => {
      e.stopPropagation();
      front( this.element() );
		};

		this.handle.addEventListener('mousedown', this.mouseDownHandler);
	}

	destroy() {
		this.handle.removeEventListener('mousedown', this.mouseDownHandler);
	}

}
