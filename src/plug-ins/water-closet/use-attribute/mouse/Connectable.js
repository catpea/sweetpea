export default class Connectable {
  element;
  system;

  #dragging = false;
  #svg;
  #line;
  #stroke = 'olive';
  #strokeWidth = 3;
  #previousX = 0;
  #previousY = 0;

  #rawX = 0;
  #rawY = 0;

  #finalX = 0;
  #finalY = 0;

  #touchdownOffsetX;
  #touchdownOffsetY;

  constructor(element, system) {
    this.element = element;
    this.system = system;

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  connectedCallback() {
    console.log('SSS', this.element);

    this.element.style.position = 'absolute'; // Ensure the element is absolutely positioned
    this.element.addEventListener('mousedown', this.mouseDownHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  disconnectedCallback() {
    this.element.removeEventListener('mousedown', this.mouseDownHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }
  get correctX() {

    return 0;
  }
  get correctY() {
    const scrollbar = window.pageYOffset;
    const y = this.system.getStage().getBoundingClientRect().y;
    const scale = this.element.getBoundingClientRect().width / this.element.offsetWidth;

    let correct = y / scale ;
    console.log('SSS', {correct, y, scrollbar});


    return correct ;
  }
  getCoordinates(){
    const scale = this.element.getBoundingClientRect().width / this.element.offsetWidth;
    let {x:elementX,y:elementY, width:elementW, height:elementH} = this.element.getBoundingClientRect();
    elementX = elementX / scale;
    elementY = elementY / scale;
    elementW = elementW / scale;
    elementH = elementH / scale;
    const centerW = elementW/2;
    const centerH = elementH/2;
    let centeredX = elementX+centerW;
    let centeredY = elementY+centerH;
    const panZoom = this.system.findOut(this.element, `${VPL_ELEMENT_PREFIX}-stage`);
    let {x:panX,y:panY} = panZoom.pan;
    panX = panX / scale;
    panY = panY / scale;
    centeredX = centeredX - panX;
    centeredY = centeredY - panY;
    return [centeredX, centeredY];
  }

  mouseDownHandler(event) {
    event.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
    event.preventDefault(); // Prevent prevent the default behavior - default action should not be taken as it normally would be.

    this.#dragging = true;

    /*
    clientX : The horizontal coordinate of the mouse pointer relative to the **viewport**, excluding any scroll offsets.
    clientY - The vertical coordinate of the mouse pointer relative to the **viewport**, excluding any scroll offsets.

    pageX - The horizontal coordinate of the mouse pointer relative to the **document** (including any scrolling).
    pageY - The vertical coordinate of the mouse pointer relative to the **document** (including any scrolling).

    screenX - The horizontal coordinate of the mouse pointer relative to the **screen's origin** (top-left corner of the screen).
    screenY - The vertical coordinate of the mouse pointer relative to the **screen's origin** (top-left corner of the screen).

    offsetX - The horizontal coordinate of the mouse pointer relative to the **target element** (e.g., an image or div), without any page or viewport offsets.
    offsetY - The vertical coordinate of the mouse pointer relative to the **target element** (e.g., an image or div).

    Note: The current ones are still widely used, while legacy ones like `layerX`, `layerY`, `screenLeft`, and `screenTop` are considered outdated and have been largely replaced by newer properties.
    layerX** (legacy) - The horizontal coordinate of the mouse pointer relative to the **layer** of the event target (deprecated in modern browsers in favor of `offsetX`).
    layerY** (legacy) - The vertical coordinate of the mouse pointer relative to the **layer** of the event target (deprecated in modern browsers in favor of `offsetY`).
    screenLeft** (legacy) - The horizontal coordinate of the mouse pointer relative to the **screen's left edge**, similar to `screenX` (but deprecated).
    screenTop** (legacy) - The vertical coordinate of the mouse pointer relative to the **screen's top edge**, similar to `screenY` (but deprecated).
    */

    // WHERE IN THE PORT THE CLICK WAS MADE
    this.#touchdownOffsetX = event.offsetX;
    this.#touchdownOffsetY = event.offsetY;

    let [x1, y1] = this.getCoordinates();

    // console.log( event, `${x1}x${y1} ${event.screenX}x${event.screenY}`);

    const scale = this.element.getBoundingClientRect().width / this.element.offsetWidth;
    let { width:elementW, height:elementH} = this.element.getBoundingClientRect();
    elementW = elementW / 2 / scale;
    elementH = elementH / 2 / scale;
    // console.log('touchdownArea', elementW, elementH);
    // console.log('touchdownOffset', this.#touchdownOffsetX, this.#touchdownOffsetY);

    this.#svg = this.system.getStage().shadowRoot.querySelector('svg');
    this.#line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    this.#line.setAttribute('x1', x1-this.correctX);
    this.#line.setAttribute('y1', y1-this.correctY);
    this.#line.setAttribute('x2', x1-this.correctX); //NOTE: set to x1 as it is initially a point
    this.#line.setAttribute('y2', y1-this.correctY); //NOTE: set to y1 as it is initially a point
    this.#line.setAttribute('stroke', this.#stroke);
    this.#line.setAttribute('stroke-width', this.#strokeWidth);
    this.#svg.appendChild(this.#line);
    // console.log('this.#line', this.#line);

    this.rawX = x1;
    this.rawY = y1;

    // Initialize previousN
    // NOTE: a sister call must be made at the end of mouseMoveHandler
    this.#previousX = event.clientX;
    this.#previousY = event.clientY;




    document.addEventListener('mousemove', this.mouseMoveHandler);
  }

  mouseMoveHandler(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.#dragging) {

    // Calculate Relative Delta
    // NOTE: this depends on "Update previousN" and we just substract to get a -n or +n from the last few dozen miliseconds
    let deltaX = (this.#previousX - event.clientX);
    let deltaY = (this.#previousY - event.clientY);

    // Apply scale transformation if any to delta (which uses screen pixels)
    // NOTE: deltaN calculations use screenN which is an untransformed pixel, but we maybe zoomed in/out so we account for that.
    const scale = this.element.getBoundingClientRect().width / this.element.offsetWidth;
    deltaX = deltaX / scale;
    deltaY = deltaY / scale;

    // RAW carries the active data
    let x = this.rawX - deltaX;
    let y = this.rawY - deltaY;

    let { width:elementW, height:elementH} = this.element.getBoundingClientRect();
    elementW = elementW / 2 / scale;
    elementH = elementH / 2 / scale;

    // Touchdown Correction
    let diffX = this.#touchdownOffsetX - elementW;
    let diffY = this.#touchdownOffsetY - elementH;

    // RAW carries the active data
    this.rawX = x;
    this.rawY = y;

    this.finalX = (x+diffX);
    this.finalY = (y+diffY);

    this.#line.setAttribute('x2', this.finalX-this.correctX); // initially a point
    this.#line.setAttribute('y2', this.finalY-this.correctY); // initially a point

    // Update previousN - get ready for next update
    this.#previousX = event.clientX;
    this.#previousY = event.clientY;

    }

  }

  mouseUpHandler(event) {
    document.removeEventListener('mousemove', this.mouseMoveHandler);

    if (this.#dragging){
      this.#dragging = false;

      this.#svg.removeChild(this.#line);
      // console.info(`Dropped element at ${this.finalX}x${this.finalY}.`, event.target, event.currentTarget, event.composedPath());

      //


      const fromActor = this.system.findOut(this.element, `${VPL_ELEMENT_PREFIX}-super`);
      const fromValve = this.system.findOut(this.element, `${VPL_ELEMENT_PREFIX}-valve`);
      const from = [fromActor.getAttribute('id'), fromValve.getAttribute('id')].join(':');
      if (!fromActor) {
        // did not drag to anything
        return;
      }
      const composedPath = event.composedPath().filter(el=>el instanceof HTMLElement).filter(el=>el.hasAttribute('id'))
      const toActor = composedPath.find(el=>el.matches(`${VPL_ELEMENT_PREFIX}-super`))
      if (!toActor) {
        // did not drag to anything
        return;
      }
      const toValve = composedPath.find(el=>el.matches(`${VPL_ELEMENT_PREFIX}-valve`))
      if (!toValve) {
        // did not detect a vale in the composed path.
        return;
      }
      const to = [toActor.getAttribute('id'), toValve.getAttribute('id')].join(':');

      const cable = document.createElement(`${VPL_ELEMENT_PREFIX}-cable`);
      cable.setAttribute('id', this.system.guid());
      cable.setAttribute('from', from);
      cable.setAttribute('to', to);
      this.system.getStage().appendChild(cable);

      // console.log({from});
      // console.log({to});
      // console.log({cable});

      // console.error('MANUAL READY DISPATCH, THE FLOW MUST ACCOUNT FOR CONNECTING AT LATER TIME');
      // fromActor.instance.dispatchReady();
      // toActor.instance.dispatchReady();

      // NOTE: can be use for some animated effect
      // const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      // circle.setAttribute('r', 10);
      // circle.setAttribute('cx', this.finalX);
      // circle.setAttribute('cy', this.finalY);
      // circle.setAttribute('fill', 'none');
      // circle.setAttribute('stroke', 'green');
      // this.#svg.appendChild(circle);

    }


  }

}
