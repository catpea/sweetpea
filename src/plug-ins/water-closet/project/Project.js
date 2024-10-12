import EventEmitter from 'event-emitter';

export default Inheritance => class Project extends Inheritance {

  project = {
    name: 'Untitled',
    file: 'untitled.txt',
  }

  generateCode(){

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

    const data = JSON.stringify({
      meta: this.project,
      data: this.dehydrate(),
    }, null, 2)

    console.log(data);
    // Create a Blob object
    const blob = new Blob([data], { type: 'text/plain' });

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
    link.download = this.project.file; // Specify the filename
    link.click();
    console.log(data);
  }

  saveAs(){
  }





  formatHTML(htmlString) {
    // Use a regular expression to split at tag boundaries
    const lines = htmlString.split(/(?=<)|(?<=>)/g);
    const formattedHTML = [];
    let indentLevel = 0;
    const indentSize = '  ';

    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('</')) {
            // Closing tag; decrement indent level first
            indentLevel--;
        }

        if (line) {
            // Add current line with the current level of indentation
            formattedHTML.push(`${indentSize.repeat(indentLevel)}${line}`);
        }

        if (line.startsWith('<') && !line.startsWith('</') && !line.endsWith('/>')) {
            // Opening tag; increment indent level after use
            indentLevel++;
        }
    });

    return formattedHTML.join('\n');
}

}
