export default class WaterCloset {
  host; // this is the element we are working with, to the element, we are known as instance
  template; // processed in two stages load and install

  constructor(host) {
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
    console.log('AAA', this.host);
    return this;
  }

  adoptCss(){
    this.host.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    console.log('XXXX', this.host.shadowRoot);
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
      return Array.from(arr, byte => byte.toString(16).padStart(2, '0'))
          .join('')
          .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5'); // Insert hyphen as per UUID formatting
  }

  isInputControl(el) {
    const tagName = el.tagName;  // Gets the tag name in uppercase form
    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
  }


  useExtensions(){
    const extensionRequests = this.host.shadowRoot.querySelectorAll('*[use]');
    ///console.log('useExtensions', extensionRequests);

    for (const element of extensionRequests) {
      const parents = this.collectParents(element, this.host.shadowRoot);
      const isOutermost = this.isOutermostElement(parents);
      if(!isOutermost) return; // only interested in outermost
      const extensions = element.getAttribute('use').split(/ /);

      for (const extension of extensions) {
        if(!this.extensions[extension]) {
          continue;
          throw new TypeError(`Unknown extension ${extension}`)
        }
        console.log(`Installing ${extension} for`, element);
        const ext = new this.extensions[extension](element, this);
        ext.connectedCallback();
        this.subscriptions.push( {type:'use/ext/disconnectedCallback', id:extension, subscription:()=>ext.disconnectedCallback()} );
      }
    }

  }

















  success(message){
    this.log(message, 'Success', 'success', 'yin-yang');
  }

  danger(message){
    this.log(message, 'Danger', 'danger', 'lightning');
  }

  warning(message){
    this.log(message, 'Warning', 'warning', 'umbrella');
  }

  info(message){
    this.log(message, 'Info', 'info', 'paperclip');
  }


  log(message, title, context='info', icon){
    const alert = this.alert(message,title,context,icon);
    document.body.appendChild(alert);
    return this;
  };

  alert(message='', title='', type='primary', icon='info-circle', accent='warning'){ //exclamation-triangle

    const alert = document.createElement('div');
    alert.classList.add('alert', `alert-${type}`, 'mb-3');

    const heading = document.createElement('h4');
    heading.classList.add('alert-heading', `text-${accent}`);
    heading.append(title)

    const graphic = document.createElement('i');
    graphic.classList.add('bi', `bi-${icon}`, 'fs-3', `text-${accent}`, 'pe-2');

    if(title) alert.append(heading);
    alert.append(graphic, message);

    return alert;

  }









// TEMPLATE
  fetchTemplate(){}

  getTemplate({attribute='template'}={}){
    let id = this.host.getAttribute(attribute);
    const template = document.getElementById(id);
    console.log(template);
    this.template = template.content.cloneNode(true);
    return this;
  }

  installTemplate(){
    console.log(this, this.template);
    console.log(this.host.shadowRoot);
    this.host.shadowRoot.appendChild(this.template);
    return this;

  }










}
