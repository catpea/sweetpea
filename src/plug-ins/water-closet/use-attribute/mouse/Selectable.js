export default class Selectable {
  element;
  system;

  constructor(element, system) {
    this.element = element;
    this.system = system;

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
  }

  connectedCallback() {
    this.element.querySelectorAll('.selectable-handle').forEach(el=>el.addEventListener('mousedown', this.mouseDownHandler));
    this.element.querySelectorAll('.selectable-handle').forEach(el=>el.addEventListener('dblclick', this.dblClickHandler));
  }

  disconnectedCallback() {
    this.element.querySelectorAll('.selectable-handle').forEach(el=>el.removeEventListener('mousedown', this.mouseDownHandler));
    this.element.querySelectorAll('.selectable-handle').forEach(el=>el.removeEventListener('dblclick', this.dblClickHandler));
  }

  dblClickHandler(event) {
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
    event.preventDefault(); // Prevent prevent the default behavior - default action should not be taken as it normally would be.
  }

  mouseDownHandler(event) {
    if( this.system.host.hasAttribute('selected') ){
      if( this.system.host.getAttribute('selected') === "true"){
        this.system.host.removeAttribute('selected')
      }else{
        this.system.host.setAttribute('selected', "true")
      }
    }else{
      this.system.host.setAttribute('selected', "true");
    }
  }
}
