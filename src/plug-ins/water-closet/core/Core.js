import EventEmitter from 'event-emitter';

export default Inheritance => class Core extends Inheritance {

  host; // this is the element we are working with, to the element, we are known as instance
  template; // processed in two stages load and install


  constructor(host) {
    super()
    this.host = host;
  }

  isDOM(){
    let current = this.host;
    while (current.parentNode||current.host) {
        current = current.parentNode||current.host;
        if (current === document) {
            return true;
        }
    }
    return false;
  }

  get ready(){
    return this.isDOM()
  }

  attachShadow(){
    this.host.attachShadow({ mode: "open" });
    //console.log('AAA', this.host);
    return this;
  }

  adoptCss(){
    this.host.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    //console.log('XXXX', this.host.shadowRoot);
    return this;
  };

  clearContent(){
    this.host.shadowRoot.replaceChildren(); // empty
    return this;
  }

  guid() {
      const arr = new Uint8Array(16); // UUID is 16 bytes
      crypto.getRandomValues(arr); // Generate random values

      // Conform to UUID version 4 specs
      arr[6] = (arr[6] & 0x0f) | 0x40; // Version 4 type (bits at 7-4 are 0100)
      arr[8] = (arr[8] & 0x3f) | 0x80; // Variant bits (10xx, meaning variant 1)

      // Convert to hexadecimal format
      return 'guid-'+Array.from(arr, byte => byte.toString(16).padStart(2, '0'))
          .join('')
          .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5'); // Insert hyphen as per UUID formatting
  }

  isInputControl(el) {
    const tagName = el.tagName;  // Gets the tag name in uppercase form
    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECTsssssssssssssss';
  }


  dispatchReady(){
    const event = new CustomEvent('ready', {
        detail: { message: 'ready!' },
        bubbles: true,
        composed: true
    });
    this.host.dispatchEvent(event);
    return this;
  }











    createElementPipe(){
        this.pipe = new EventEmitter();
        return this;

    }














// TEMPLATE
  fetchTemplate(){}

  getTemplate({attribute,selector}={attribute:'template', selector:""}){

    let template;
    if(attribute){
      let id = this.host.getAttribute(attribute);
      template = document.getElementById(id);
    }else if (selector){
      template = document.querySelector(selector);
    }
    this.template = template.content.cloneNode(true);
    console.log(`${this.host.tagName} installed template:`, this.template);
    return this;
  }

  installTemplate(){
    this.host.shadowRoot.appendChild(this.template);
    return this;
  }










}
