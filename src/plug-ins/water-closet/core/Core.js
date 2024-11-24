import EventEmitter from 'event-emitter';
import Signal from 'signal';
import location from 'location';

export default Inheritance => class Core extends Inheritance {

  host; // this is the element we are working with, to the element, we are known as instance
  template; // processed in two stages load and install

  debug = new Signal();


  constructor(host) {
    super()
    this.host = host;
  }





  async fetchJSON(json){
    let url = `${location(window.location.href)}/${json}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok: ' + response.statusText);
    return await response.json(); // Get the response text
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

  getAllActorsOnStage(){
    return this.getStage().querySelectorAll(`${VPL_ELEMENT_PREFIX}-super, ${VPL_ELEMENT_PREFIX}-cable`);
  }




  bringToFront(selected) {

    const children = Array.from(this.getStage().children)
      .filter(o => o.tagName.toLowerCase() == `${VPL_ELEMENT_PREFIX}-super`)
      .map(o => o.instance.searchShadow('.perspective').pop()) // pull up .perspective container
      .filter(e => e);



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






// TEMPLATE

  getTemplate({attribute,selector}={attribute:'template', selector:""}){

    let template;
    if(attribute){
      let id = this.host.getAttribute(attribute);
      template = document.getElementById(id);
    }else if (selector){
      template = document.querySelector(selector);
    }
    this.template = template.content.cloneNode(true);
    // console.log(`${this.host.tagName} installed template:`, this.template);
    return this;
  }

  installTemplate(){
    this.host.shadowRoot.appendChild(this.template);
    return this;
  }










}
