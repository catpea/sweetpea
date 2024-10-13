import EventEmitter from 'event-emitter';

export default Inheritance => class Project extends Inheritance {

  project = {
    name: 'Untitled',
    file: 'untitled.txt',
  }

  generateCode(){
    const lines = [];
    lines.push(`
      // URGENT: this should be a zip or tar file.
      import actors from 'sweetpea-company';
      const stage = new Stage();
    `.split('\n').map(i=>i.trim()).join('\n'))
    const meta = this.project;
    const data = this.dehydrate();


    function omit(o, ...keys){
      return Object.fromEntries(Object.entries(o).filter(e=>!keys.includes(e[0])));
    }

    function str(input) {
      return JSON.stringify(input)
    }
    function className(str) {
        return str
            .split(/[^a-z0-1)]/i) // Split by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
            .join(''); // Join without spaces
    }
    function toInstanceName(str) {
      const word = className(str);
      return word.charAt(0).toLowerCase() + word.slice(1);

    }
    function toPropertyName(str) {
      const word = className(str);
      return word.charAt(0).toLowerCase() + word.slice(1);

    }


    let counter = 0;
    for (const actorObject of data) {

      delete actorObject.x;
      delete actorObject.y;

      if(actorObject.type == 'super'){
        const name = actorObject.type;
        const type = actorObject.worker;
        const properties = omit(actorObject, 'type', 'id', 'worker');
        const instanceName = toInstanceName(`${name}${counter}`);

        lines.push(`const ${instanceName} = new ${className(name)}(stage);`)
        for (const property in properties) {
          const value = properties[property]
          lines.push(`${instanceName}.${toPropertyName(property)} = ${str(value)}`)
        }
        lines.push(`await ${instanceName}.worker(${str(type)});`)

      }else{
        const name = actorObject.type;
        const type = actorObject.type;
        const properties = omit(actorObject, 'type', 'id');
        const instanceName = toInstanceName(`${name}${counter}`);
        lines.push(`const ${instanceName} = new ${className(type)}(stage);`)
        for (const property in properties) {
          const value = properties[property]
          lines.push(`${instanceName}.${toPropertyName(property)} = ${str(value)}`)
        }
      }

      lines.push('')
      counter++;
    }

    lines.push(`
      stage.director.emit('start');
      // TODO: nonitor CTRL-C, setup HTTP, daemonize, setup browser extenion, etc.
    `.split('\n').map(i=>i.trim()).join('\n'))

    console.log(lines.join('\n'));
    this.downloadDialogue('code.js', lines.join('\n'));

  }

  dehydrate(){
    const response = [];
    for (const child of this.getStage().children) {
      console.log(child); // Do something with each child element
      const obj = {};
      obj.type = child.tagName.toLowerCase().split('-')[1];
      const attributes = Object.fromEntries(Array.from(child.attributes).map(attr => [attr.name, attr.value]));
      Object.assign(obj, attributes);
      response.push(obj);
    }
    return response;
  }

  // Convert to HTML
  rehydrate(rawData){
    return rawData;
  }

  blank(){
    this.getStage().replaceChildren();
  }

  open(){
    this.host.shadowRoot.getElementById('fileInput').click();
    this.host.shadowRoot.getElementById('fileInput').addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const contents = await file.text();
        const {meta, data} = JSON.parse(contents)
        // console.log({meta, data});
        this.getStage().replaceChildren(); // Clear Stage

        for (const actorObject of data) {
          const actorElement = document.createElement(`${globalThis.sweetpea.prefix}-${actorObject.type}`);
          delete actorObject.type;
          for (const [attributeName, attributeValue] of Object.entries(actorObject)) {
              actorElement.setAttribute(attributeName, attributeValue);
          }
          console.log(actorElement);
          this.getStage().appendChild(actorElement);
        }

        this.project = meta;
      }
    });
  }

  save(){

    const str = JSON.stringify({
      meta: this.project,
      data: this.dehydrate(),
    }, null, 2)

    this.downloadDialogue(this.project.file, str);

  }

  saveAs(){
  }


  downloadDialogue(name, str){
    const blob = new Blob([str], { type: 'text/plain' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Get the iframe element
    const iframe = this.host.shadowRoot.getElementById('downloadIframe');

    // Set the iframe's source to the Blob URL
    iframe.src = url;

    // Optionally, revoke the Blob URL after a short delay
    setTimeout(() => {
        URL.revokeObjectURL(url);
    }, 100);

    // Trigger download by creating a temporary link (optional for browsers)
    const link = document.createElement('a');
    link.href = url;
    link.download = name; // Specify the filename
    link.click();

  }


//   formatHTML(htmlString) {
//     // Use a regular expression to split at tag boundaries
//     const lines = htmlString.split(/(?=<)|(?<=>)/g);
//     const formattedHTML = [];
//     let indentLevel = 0;
//     const indentSize = '  ';
//
//     lines.forEach(line => {
//         line = line.trim();
//         if (line.startsWith('</')) {
//             // Closing tag; decrement indent level first
//             indentLevel--;
//         }
//
//         if (line) {
//             // Add current line with the current level of indentation
//             formattedHTML.push(`${indentSize.repeat(indentLevel)}${line}`);
//         }
//
//         if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
//             // Opening tag; increment indent level after use
//             indentLevel++;
//         }
//     });
//
//     return formattedHTML.join('\n');
// }

}
