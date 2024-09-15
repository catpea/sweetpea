class UI {

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

}



export default class System {

  #ui = new UI();

  host;

  #context;
  set context(v){
    this.#context = v;
    ////console.log(`${this.host.tagName} set context to:`, this.#context);
  }
  get context(){
    ////console.log(`${this.host.tagName} read context`, this.#context);
    return this.#context
  }

  template;

  subscriptions = []; // {type:'list/item/value', id:'', run}

  // both of these rely on a different installer
  #prefix = 'data';
  #voidTags = ['print', 'bind', 'cable', 'program', 'port', 'seed'];
  #containerTags = ['loop', 'scene'];
  #allTags = []

  constructor(host) {
    this.host = host;
    this.#allTags = this.#allTags.concat(this.#voidTags, this.#containerTags);
    ////console.log(this.#allTags);
  }

  get ready(){
    return this.isDOM()
  }

  // --

  attachEatingShadow(){
    const shadow = this.host.attachShadow({ mode: "open" });
    const slot = document.createElement('slot');
    this.host.shadowRoot.appendChild(slot);
    return this;
  }

  attachShadow(){
    const shadow = this.host.attachShadow({ mode: "open" });
    return this;
  }

  setContextFromString(){
    let code = this.host.getAttribute('context');
    if(!code) return this;
    let program = new Function(`return ${code};`).bind(globalThis);
    this.context = program();
    return this;
  }

  setContextFromProperty(){

    ////////console('setContextFromProperty', this.context);

    if(!this.context) return this;

    const positionalArguments = this.host.getAttribute('arguments');
    if(!positionalArguments) return this;
    const [propertyName] = positionalArguments.split(' ');

    if(!this.context[propertyName]) return this;
    // if(!this.context[propertyName].subscribe) return this;

    this.context = this.context[propertyName]
    return this;
  }

  retrieveContext(){
    return this.context;
  }
  updateContext(v){
    this.context = v;
  }

  removeSubscription(){
    this.subscriptions.map(x=>x.subscription())
    return this;
  }

















  adoptCss(){
    this.host.shadowRoot.adoptedStyleSheets = document.adoptedStyleSheets;
    return this;
  };


  async fetchTemplate(){
    const url = this.host.getAttribute('url');
    const response = await fetch(url);
    let html = await response.text();

    for (const name of this.#voidTags) {

      const seek0 = new RegExp(`<new ${name} `, 'g');
      html = html.replace(seek0, `<source new ${name} `);

      const seek1 = new RegExp(`<${name} `, 'g');
      html = html.replace(seek1, `<embed ${name} `);

      const seek2 = new RegExp(`<${name}>`, 'g');
      html = html.replace(seek2, `<embed ${name}>`);

    }
    html = html.replace(/is="fire" /g, 'is="data-fire"');
    const container = document.createElement('div');
    //console.log(html);
    container.innerHTML = html.trim();
    this.template = container.children;
    return this;

  }

  normalizeTemplate(){
    let templateChildren;

    console.log(this.host.tagName,  this.template, 'normalizeTemplate', this.template )
    ////console.log('normalizeTemplate typeof this.template:', typeof this.template )
    ////console.log('normalizeTemplate Array.isArray(this.template):', Array.isArray(this.template) )
    ////console.log('normalizeTemplate instanceof DocumentFragment:', this.template instanceof DocumentFragment )
    ////console.log('normalizeTemplate instanceof HTMLCollection:', this.template instanceof HTMLCollection )

    if( Array.isArray(this.template) ){
      templateChildren = this.template;
    }else if(this.template instanceof HTMLCollection){
      templateChildren = [...this.template];
    }else if(this.template instanceof DocumentFragment){
      templateChildren = [...this.template.children];
    }

    console.log(this.host.tagName, {templateChildren});

    let response;

    const noTemplate = templateChildren.length === 0;
    const oneTempate =  templateChildren.length === 1
    const manyTemplates = templateChildren.length > 0;

    if (noTemplate){
      // let blankRoot = document.createElement('div');
      // blankRoot.append('no template!')
      // response = blankRoot;
    } else if (manyTemplates){
      let singeRoot = document.createElement('div');
      singeRoot.append(...templateChildren)
      response = singeRoot;
    }else if(oneTempate){ // only one
      response = templateChildren[0]; // correct selection
    }

    this.template = response;

    return this;
  }

  debugTemplate(){
    ////console.debug(`debugTemplate: BBB ${this.host.tagName} TEMPLATE!`, this.template?.outerHTML, this.host.shadowRoot.querySelector('slot').assignedNodes());

    return this;
  }

  consumeEatingTemplate(){
    let template;
    const templateCandidates = this.host.shadowRoot.querySelector('slot').assignedNodes();//.filter(node => node.nodeType === Node.ELEMENT_NODE);
    this.template = templateCandidates;
    return this;
  }

  unfurlTemplate(){
    if(!this.template) return this; // no template

    // The void elements in HTML are as follows:
    // <area>
    // <base>
    // <br>
    // <col>
    // <embed>
    // <hr>
    // <img>
    // <input>
    // <link>
    // <meta>
    // <param> Deprecated
    // <source>
    // <track>
    // <wbr>

    // VOID TAG PROCESSING!


    this.template.querySelectorAll('embed').forEach(directive => {
      const attributes = [...directive.attributes];
      const {name} = attributes.shift(); // the first argument is the tag kind
      const replacement = document.createElement(`data-${name}`);
      const positionalArguments = [];

      attributes.forEach((attr, index) => {
        const isArgument = attr.value.length == 0;
        if(isArgument){
          positionalArguments.push(attr.name)
        }else{
          replacement.setAttribute(attr.name, attr.value);
        }
      });

      if(positionalArguments.length) replacement.setAttribute(`arguments`, positionalArguments.join(' '));
      directive.replaceWith(replacement);
      //console(`EMBED PROCESSING created ${`<data-${name}`}>`);
    });

    // this.template.querySelectorAll('link').forEach(directive => {
    //   const attributes = [...directive.attributes];
    //   const {name} = attributes.shift();
    //   const replacement = document.createElement(`data-print`);
    //   replacement.setAttribute('signal', name);
    //   attributes.forEach(attr => {
    //         replacement.setAttribute(attr.name, attr.value);
    //   });
    //   directive.replaceWith(replacement);
    // });


    //
    // html = html.replace(/\{\{(\w+)\}\}/g, (_, propName) => `<data-print property="${propName}"></data-print>`);
    // html = html.replace(/<bug\/>/g, (_, propName) => `<data-bug></data-bug>`);
    //
    // this.template.innerText = html;

    // Tag Rendering
    // for (const selector in this.#fire) {
    //   this.template.querySelectorAll(selector).forEach(el => {
    //     const isAttribute = el.getAttribute('is');
    //     const allowed = this.#fire[selector]
    //     for (const transform of allowed) {
    //       if(isAttribute == transform){
    //         el.setAttribute('is', 'data-'+isAttribute)
    //         //console(isAttribute, transform);
    //         //console(el, 'data-'+isAttribute);
    //       }
    //     }
    //   });
    // }

    for (const tag of this.#containerTags) {
      this.template.querySelectorAll(tag).forEach(directive => {
        //console('TAGS PROCESSING', directive.tagName);

        const replacement = document.createElement(`data-${tag}`);
        const positionalArguments = [];
        [...directive.attributes].forEach((attr, index) => {
          const isArgument = attr.value.length == 0;
          if(isArgument){
            positionalArguments.push(attr.name)
          }else{
            replacement.setAttribute(attr.name, attr.value);
          }
        });
        if(positionalArguments.length) replacement.setAttribute(`arguments`, positionalArguments.join(' '));

        while (directive.firstChild) {
            replacement.appendChild(directive.firstChild);
        }

        ////////console('CCC BEFORE', replacement.innerHTML);

        directive.replaceWith(replacement);
        //////console('DDD AFTER', replacement.outerHTML);
      });
    }




    return this;

  }
  //
  // subscribeAndRender(){
  //   const propertyName = this.host.getAttribute('property');
  //   const subscription = this.context.subscribe(contextObject=>this.#renderer.echoValue(contextObject, propertyName))
  //   this.subscriptions.push( {type:'context', id:'property', subscription} );
  //
  //   return this;
  // }

  clearContent(){
    this.host.shadowRoot.replaceChildren(); // empty
    return this;
  }



  renderDelegate({above}={above:false}){

    if(!this.template) console.log(this.host.tagName, 'template was empty');
    if(!this.template) return this;

    const item = this.context || {};
    let templateClone = this.template.cloneNode(true);
    templateClone.dataset.key = item.key;

    // // THIS MUST RUN FOR EVEY ITERATION OF A LOOP
    // templateClone.querySelectorAll('source').forEach(source => {
    //   // Capture Native Order
    //   const attributes = [ ...source.attributes ]; // capture order
    //   const {name:directiveName} = attributes.shift(); // the first argument is the tag kind
    //   const {name:tagName} = attributes.shift(); // the first argument is the tag kind
    //
    //   // Conditionally
    //   const conditionCode = source.getAttribute('when');
    //   const conditionFuncion = this.billOfValues(this.context) + `return ${conditionCode};`
    //   let conditionFulfilled = new Function(conditionFuncion).call(this.context);
    //
    //   if(!conditionFulfilled) continue; // condition not fullfilled!
    //
    //   // copy attributes
    //   const replacement = document.createElement(`data-${tagName}`);
    //   for (const attr of source.attributes) {
    //     if(attr.name == directiveName){
    //       // ignore "new"
    //     }else if(attr.name == tagName){
    //       // ignore name of thing to be instantiated
    //     }else if(attr.name == 'when'){
    //       // ignore condition to be evaluated
    //     }else{
    //       replacement.setAttribute(attr.name, attr.value);
    //     }
    //   }
    //   // replace the source tag with the real tag (if condition passed!)
    //   source.replaceWith(replacement);
    // });

    ////console.log('allTags', this.#allTags);
      for (const tag of this.#allTags) {
        //console.log(`${this.host.tagName} Scanning for data-${tag} and found ${this.host.querySelectorAll(`data-${tag}`).length}`);


        for (const el of templateClone.querySelectorAll(`data-${tag}`)) {
           const parents = [];
           let parent = el.parentNode;
           while(parent !== templateClone){
             // parents.push(el.parentNode)
             parents.push(parent)
             parent = parent.parentNode;
           }
           // //console.log(`Found ${el.tagName} with parents`, parents.map(o=>o.tagName));
          const isOutermost = !parents.map(o=>o.tagName).find(o=>o.match(/^DATA-/));
          if(!isOutermost) continue; // only interested in outermost
          el.context = item;
          //console.log(`DELEGATE: ${this.host.tagName} found ${el.tagName} and set context to`, el.context);
        }


        for (const el of this.host.querySelectorAll(`data-${tag}`)) {
           let parent = el.parentNode;
           const parents = [];
           while(parent !== this.host){
             // //console.log(this.host.tagName, parent.tagName, templateClone.tagName, parent == templateClone);
             // if(parent == templateClone) break;
             parents.push(parent)
             parent = parent.parentNode;
             // if(!parent) break;
           }
           //console.log(`Found ${el.tagName} with parents`, parents.map(o=>o.tagName));

          const isOutermost = !parents.map(o=>o.tagName).find(o=>o.match(/^DATA-/));
          if(!isOutermost) continue; // only interested in outermost
          el.context = item;
          // //console.log(`${this.host.tagName} found ${el.tagName} and set context to`, el.context);
          //console.log(`DELEGATE: ${this.host.tagName} found ${el.tagName} and set context to`, el.context);

        }



      }

      if(above){
        this.host.shadowRoot.host.appendChild(templateClone);
      }else{
        this.host.shadowRoot.appendChild(templateClone);
      }


    return this;

  }

  registerWithScene(){
    this.getScene().registry.set(this.host.getAttribute('id'), this.host)
    this.subscriptions.push( {type:'scene-registrant', id:this.host.getAttribute('id'), subscription:()=>this.getScene().registry.delete(this.host.getAttribute('id'), this.host)} );
  }


  // renderTemplateDelegate(){
  //   let templateClone = this.template.cloneNode(true);
  //
  //     for (const tag of this.#containerTags) {
  //       for (const el of templateClone.querySelectorAll(`data-${tag}`)) {
  //          const parents = [];
  //          let parent = el.parentNode;
  //          while(parent !== templateClone){
  //            parents.push(el.parentNode)
  //            parent = parent.parentNode;
  //          }
  //          const isOutermost = !parents.map(o=>o.tagName).find(o=>o.match(/^DATA-/));
  //         if(!isOutermost) continue; // only interested in outermost
  //         ////////console(`Tag ${this.host.tagName} applied context to ${el.tagName}`, el.context);
  //
  //         el.context = item;
  //         ////////console(el.context);
  //       }
  //     }
  //
  //   this.host.shadowRoot.appendChild(templateClone);
  //   return this;
  //
  // }

  renderContext(){

    if(!this.context){
      //////console(`Tag ${this.host.tagName} has no context`);
      return this;
    }

    //console.debug(`renderContext: FROM ${this.host.tagName.toLowerCase()}/${this.host.getAttribute('name')}`, this.context,);
    //console(this.context);
    const subscription = this.context.subscribe(contextObject=>this.renderTemplate(contextObject))
    this.subscriptions.push( {type:'context', id:'main', subscription} );
    return this;
  }

  renderContextDump(){
    const code = this.billOfValues(this.context);
    let dump = document.createElement('pre');
    dump.classList.add(...'border border-danger rounded mb-3'.split(' '))
    dump.append(code);
    return this;
    this.host.shadowRoot.appendChild(dump);
  }

  generateTemplate(){
    const root = document.createElement(`div`);

    const componentName = this.host.getAttribute('of');
    const conditionCode = this.host.getAttribute('when');
    const componentAttributes = this.host.getAttribute('attributes');
    const componentAttributeList = componentAttributes.split(/ /);
    const conditionFuncion = this.billOfValues(this.context) + `return ${conditionCode};`

    let conditionFulfilled = new Function(conditionFuncion).call(this.context);
    if(!conditionFulfilled) return this;

    const instanceComponent = document.createElement(`${this.#prefix}-${componentName}`);
    for (const attributeName of componentAttributeList) {

      console.log(`${this.host.tagName} fetching ${attributeName} from context`, this.context);

      const attributeValue = this.context[attributeName].get();
      instanceComponent.setAttribute(attributeName, attributeValue)
    }

    root.appendChild(instanceComponent);
    this.template = root.children

    return this;

  }

  // renderInstance(){
  //   const componentName = this.host.getAttribute('of');
  //   const conditionCode = this.host.getAttribute('when');
  //   const componentAttributes = this.host.getAttribute('attributes');
  //   const componentAttributeList = componentAttributes.split(/ /);
  //
  //   const conditionFuncion = this.billOfValues(this.context) + `return ${conditionCode};`
  //   let result = new Function(conditionFuncion).call(this.context);
  //   let corona = document.createElement('pre');
  //   corona.classList.add(...'border border-danger rounded mb-3'.split(' '))
  //   corona.append(conditionFuncion, '\n', result)
  //   this.host.shadowRoot.appendChild(corona);
  //
  //   console.error('NOT USING SIGNALS TODO!!!!!!!!');
  //   let instanceComponent = document.createElement(`${this.#prefix}-${componentName}`);
  //   for (const attributeName of componentAttributeList) {
  //     console.log(attributeName);
  //     const attributeValue = this.context[attributeName].get();
  //     instanceComponent.setAttribute(attributeName, attributeValue)
  //   }
  //   this.host.shadowRoot.appendChild(instanceComponent);
  //   console.log(instanceComponent);
  // }

  renderValue(){

    const positionalArguments = this.host.getAttribute('arguments');

    if(!positionalArguments){
      console.error(this.host);
    }

    const withSelector = this.host.getAttribute('with');
    const limitSpecifier = this.host.getAttribute('limit');
    const [propertyName] = positionalArguments.split(' ');
    const matches = upwards(this.host, withSelector);

    //console.log(`${this.host.tagName} -> ${propertyName} with ${withSelector} ... CONTEXT:`, this.context);

    //console({limitSpecifier});
    if(limitSpecifier !== null){
      if(limitSpecifier=='*'){
        // noop
      }else{
        const size = Math.min(matches.length, parseInt(limitSpecifier));
        //console({size});
        matches.length = size;
      }
    }else{
      matches.length = 1;
    }

    //console(matches);

    if(!this.context) return this;
    if(!this.context[propertyName]) return this;
    if(!this.context[propertyName].subscribe) return this;

    for (const matchingElement of matches) {

      if(this.isInputControl(matchingElement)){
        let applicator = (el,v)=>el.value=v;
        const subscription = this.context[propertyName].subscribe(attributeValue=>applicator(matchingElement, attributeValue));
        this.subscriptions.push( {type:'value', id:`${this.context.key}.${propertyName}`, subscription} );
        const updateValue = (e) => this.context[propertyName].set(e.target.value);
        matchingElement.addEventListener("input", updateValue);
        this.subscriptions.push( {type:'value', id:`${this.context.key}.${propertyName}`, subscription:()=>removeEventListener("input", updateValue)} );

      }else{
        let applicator = (el,v)=>el.innerHTML=v;
        const subscription = this.context[propertyName].subscribe(attributeValue=>applicator(matchingElement, attributeValue));
        this.subscriptions.push( {type:'value', id:`${this.context.key}.${propertyName}`, subscription} );
      }

    }

  }






  // INTERMEDIATE.. continuing to drill down templates
  renderTemplate(listOfValues){
    ////////console({signalValue});



    const arriving = listOfValues.map(o=>[o.key, o])
    const existing = Object.fromEntries([...this.host.shadowRoot.children].map(o=>[o.dataset.key, o]));

    // -- Addition -- //
    // TODO: this must be in order in the DOM as well insertAfter...
    listOfValues.forEach(listItem => {
      const missing = existing[listItem.key] === undefined;
      if(missing){
        this.renderObject(listItem);
      }
    });

    // -- Removal -- //
    for (const key in existing) {
      const deleted = !arriving[key];
      if(deleted) {
         this.host.shadowRoot.removeChild(existing[key]);
      }
    }

    //
    return this;

  }

  // Rendering a piece of the array, or object with a key.
  renderObject(listItem){

    let corona = document.createElement('div');
    corona.classList.add(...'border border-primary rounded mb-3'.split(' '))
    let templateClone = this.template.cloneNode(true);


    // THIS MUST RUN FOR EVEY ITERATION OF A LOOP
    templateClone.querySelectorAll('source').forEach(source => {


      const parents = [];
      let parent = source.parentNode;
      while(parent !== templateClone){
        parents.push(source.parentNode)
        parent = parent.parentNode;
      }
      const isOutermost = !parents.map(o=>o.tagName).find(o=>o.match(/^DATA-/));
     if(!isOutermost) return; // only interested in outermost


      // Capture Native Order
      const attributes = [ ...source.attributes ]; // capture order
      const {name:directiveName} = attributes.shift(); // the first argument is the tag kind
      const {name:tagName} = attributes.shift(); // the first argument is the tag kind

      // Conditionally
      const conditionCode = source.getAttribute('when');
      const conditionFuncion = this.billOfValues(listItem.get()) + `return ${conditionCode};`
      let conditionFulfilled = new Function(conditionFuncion).call(listItem);

      if(!conditionFulfilled){
        source.remove();
        return; // condition not fullfilled!
      }

      // copy attributes
      const replacement = document.createElement(`data-${tagName}`);
      for (const attr of source.attributes) {
        if(attr.name == directiveName){
          // ignore "new"
        }else if(attr.name == tagName){
          // ignore name of thing to be instantiated
        }else if(attr.name == 'when'){
          // ignore condition to be evaluated
        }else if(attr.name == 'attributes' && attr.value){
          const componentAttributeList = attr.value.split(/ /);
          for (const attributeName of componentAttributeList) {
            console.log('YYY', listItem, attributeName);
            const attributeValue = listItem.get()[attributeName].get();
            replacement.setAttribute(attributeName, attributeValue)
          }
        }else{
          replacement.setAttribute(attr.name, attr.value);
        }
      }
      // replace the source tag with the real tag (if condition passed!)
      source.replaceWith(replacement);
    });


    //console(listItem);
    templateClone.dataset.key = listItem.key;
    const subscription = listItem.subscribe(c=>{



      for (const tag of this.#allTags) {
        for (const el of templateClone.querySelectorAll(`data-${tag}`)) {
           const parents = [];
           let parent = el.parentNode;
           while(parent !== templateClone){
             parents.push(el.parentNode)
             parent = parent.parentNode;
           }
           const isOutermost = !parents.map(o=>o.tagName).find(o=>o.match(/^DATA-/));
          if(!isOutermost) continue; // only interested in outermost
          ////////console(`Tag ${this.host.tagName} applied context to ${el.tagName}`, el.context);

          el.context = c;
          ////////console(el.context);
        }
      }



    });

    this.subscriptions.push( {type:'item', id:listItem.key, subscription} );
    this.host.shadowRoot.append(...templateClone.children);
  };




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
    const alert = this.#ui.alert(message,title,context,icon);
    this.getApplication().shadowRoot.appendChild(alert);
    return this;
  };




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

  // getSvg(){
  //   let response = null;
  //
  //   if(this.host.tagName.toLowerCase() == 'svg'){
  //     response =  this.host;
  //   }else{
  //     response = upwards(this.host, 'svg').pop();
  //   }
  //   return response;
  // }

  getScene(){
    let response = null;

    if(this.host.tagName.toLowerCase() == 'data-scene'){
      response =  this.host;
    }else{
      response = upwards(this.host, 'data-scene').pop();
    }
    return response;
  }

  getApplication(){
    let response = null;

    if(this.host.tagName.toLowerCase() == 'data-root'){
      response =  this.host;
    }else{
      response = upwards(this.host, 'data-root').pop();
    }

    console.log(`${this.host.tagName} getApplication()`, response);

    return response;
  }


  isInputControl(el) {
    const tagName = el.tagName;  // Gets the tag name in uppercase form
    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT';
  }





  billOfValues(context){
    const valueSnapshot = [];
    for (const variableName in context) {
      const variableValue = context[variableName].get();
      valueSnapshot.push(`const ${variableName} = ${JSON.stringify(variableValue)};`)
    }
    const valueHeader = valueSnapshot.join('\n') + '\n';
    return valueHeader + '\n';

  }

}








function guid() {
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

function upwards(el, selector) {
  const response = [];
  const scanned = [];
  while ((el = el.parentNode||el.host) && el !== document ) {
    const selectables = [el, ...el.children].reverse();
    for (const el of selectables) {
      scanned.push(el)
      if (el.matches && el.matches(selector)) response.push(el);
    }
  }

  console.log({scanned});
  return response;
}
