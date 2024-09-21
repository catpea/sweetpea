
export default class Space extends HTMLElement {


    #pan = { x: 0, y: 0 };
    #zoom = 1;
    #startPan = { x: 0, y: 0 };
    #startMousePos = { x: 0, y: 0 };
    #isPanning = false;






    constructor() {
      super();


        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    overflow: hidden;
                    position: relative;
                    touch-action: none;
                    user-select: none;
                }
                .content {
                    transform-origin: 0 0;
                    /* transition: transform 0.1s; */
                }
            </style>
            <div class="content">
                <slot></slot>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.$content = this.shadowRoot.querySelector('.content');

        this.addEventListener('mousedown', this.#onMouseDown.bind(this));
        this.addEventListener('mousemove', this.#onMouseMove.bind(this));
        this.addEventListener('mouseup', this.#onMouseUp.bind(this));
        this.addEventListener('wheel', this.#onWheel.bind(this), { passive: false });
        this.addEventListener('touchstart', this.#onTouchStart.bind(this));
        this.addEventListener('touchmove', this.#onTouchMove.bind(this));
        this.addEventListener('touchend', this.#onTouchEnd.bind(this));
    }








    get pan() {
        return this.#pan;
    }

    set pan(value) {
        this.#pan = value;
        this.#updateTransform();
    }

    get zoom() {
        return this.#zoom;
    }

    set zoom(value) {
        this.#zoom = value;
        this.#updateTransform();
    }

    #updateTransform() {
        this.$content.style.transform = `translate(${this.#pan.x}px, ${this.#pan.y}px) scale(${this.#zoom})`;
    }

    #onMouseDown(event) {
        this.#isPanning = true;
        this.#startMousePos = { x: event.clientX, y: event.clientY };
        this.#startPan = { ...this.#pan };
        event.preventDefault();
    }

    #onMouseMove(event) {
        if (this.#isPanning) {
            this.#pan.x = this.#startPan.x + (event.clientX - this.#startMousePos.x);
            this.#pan.y = this.#startPan.y + (event.clientY - this.#startMousePos.y);
            this.#updateTransform();
        }
    }

    #onMouseUp(event) {
        this.#isPanning = false;
    }

    #onWheel(event) {
        const deltaScale = event.deltaY > 0 ? 0.9 : 1.1;
        this.#zoom *= deltaScale;

        const rect = this.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        this.#pan.x = offsetX * (1 - deltaScale) + deltaScale * this.#pan.x;
        this.#pan.y = offsetY * (1 - deltaScale) + deltaScale * this.#pan.y;

        this.#updateTransform();
        event.preventDefault();
    }

    #onTouchStart(event) {
        if (event.touches.length === 1) {
            this.#isPanning = true;
            this.#startMousePos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
            this.#startPan = { ...this.#pan };
        }
        event.preventDefault();
    }

    #onTouchMove(event) {
        if (this.#isPanning && event.touches.length === 1) {
            this.#pan.x = this.#startPan.x + (event.touches[0].clientX - this.#startMousePos.x);
            this.#pan.y = this.#startPan.y + (event.touches[0].clientY - this.#startMousePos.y);
            this.#updateTransform();
        }
    }

    #onTouchEnd(event) {
        this.#isPanning = false;
    }










}
