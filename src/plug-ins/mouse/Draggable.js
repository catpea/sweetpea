export default class DraggableElement extends HTMLDivElement {
    #dragging = false;
    #offsetX = 0;
    #offsetY = 0;

    constructor() {
      console.log('Hello DraggableElement');
        super();
        this.mouseDownHandler = this.mouseDownHandler.bind(this);
        this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
        this.mouseUpHandler = this.mouseUpHandler.bind(this);
    }

    connectedCallback() {
        this.style.position = 'absolute'; // Ensure the element is absolutely positioned
        this.addEventListener('mousedown', this.mouseDownHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
        console.log(this);
    }

    disconnectedCallback() {
        this.removeEventListener('mousedown', this.mouseDownHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
        document.removeEventListener('mousemove', this.mouseMoveHandler);
    }

    mouseDownHandler(event) {
        this.#dragging = true;
        this.#offsetX = event.clientX - this.getBoundingClientRect().left;
        this.#offsetY = event.clientY - this.getBoundingClientRect().top;
        document.addEventListener('mousemove', this.mouseMoveHandler);
        event.preventDefault(); // Prevent default dragging behaviors
    }

    mouseMoveHandler(event) {
        if (this.#dragging) {
            const x = event.clientX - this.#offsetX;
            const y = event.clientY - this.#offsetY;
            this.style.left = `${x}px`;
            this.style.top = `${y}px`;
        }
    }

    mouseUpHandler(event) {
        this.#dragging = false;
        document.removeEventListener('mousemove', this.mouseMoveHandler);
    }
}
