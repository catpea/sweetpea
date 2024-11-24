export default class Focusable {

  activationClass = '.focusable-handle';

  element;
  system;

  constructor(element, system) {
    this.element = element;
    this.system = system;

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
  }

  connectedCallback() {
    if( this.element.querySelectorAll(this.activationClass).length == 0 ){
      console.log(`Located ${this.element.querySelectorAll(this.activationClass).length} ${this.activationClass} `);
      throw new Error('failed to locate activation targets')
    }

    this.element.querySelectorAll(this.activationClass).forEach(el=>el.addEventListener('mousedown', this.mouseDownHandler));
    this.element.querySelectorAll(this.activationClass).forEach(el=>el.addEventListener('dblclick', this.dblClickHandler));
  }

  disconnectedCallback() {
    this.element.querySelectorAll(this.activationClass).forEach(el=>el.removeEventListener('mousedown', this.mouseDownHandler));
    this.element.querySelectorAll(this.activationClass).forEach(el=>el.removeEventListener('dblclick', this.dblClickHandler));
  }

  dblClickHandler(event) {
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
    event.preventDefault(); // Prevent prevent the default behavior - default action should not be taken as it normally would be.
  }

  mouseDownHandler(event) {

    // Selecting Elements: It retrieves the selected element and all relevant children, filtering them based on their tag name.
    const selected = this.system.searchShadow('.perspective').pop();
    const children = Array.from(this.system.getStage().children).filter(o=>o.tagName.toLowerCase() == `${VPL_ELEMENT_PREFIX}-super`).map(o=>o.instance.searchShadow('.perspective').pop()).filter(e => e)


    // Normalizing z-index: It ensures that any elements without a defined z-index are assigned one based on their order.
    for (const [index, supervisor] of children.entries()) {
      if(supervisor.style.zIndex === '') supervisor.style.zIndex = String(index);
    }

    // Finding the Topmost z-index: It calculates the maximum z-index among the children to determine the next available z-index.
    let top = String( Math.max( ...children.map(o=>parseInt(o.style.zIndex)) ) + 1);

    // Setting the Selected Element: It updates the z-index of the selected element to be one higher than the current maximum.
    selected.style.zIndex = top;

    // Reindexing: Finally, it sorts the children by their z-index and applies a zero-based numbering scheme.
    for (const [index, supervisor] of [...children].sort((a,b)=>parseInt(a.style.zIndex) - parseInt(b.style.zIndex) ).entries()) {
      const oldValue = supervisor.style.zIndex;
      const newValue = ''+index;
      if(oldValue !== newValue){
        supervisor.style.zIndex = newValue;
      }
    }

  }



}
