import EventEmitter from 'event-emitter';

export default Inheritance => class Project extends Inheritance {

  project = {
    name: 'Untitled',
    file: 'untitled.txt',
  }

  create(){
    this.getStage().replaceChildren();
  }

  open(){
    this.host.shadowRoot.getElementById('fileInput').click();
    this.host.shadowRoot.getElementById('fileInput').addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        const contents = await file.text();
        const [rawJson, rawHtml] = contents.split(/\n---\n/, 2);
        console.log(rawHtml);
        this.getStage().innerHTML = rawHtml;
        console.log(this.getStage().shadowDom);
        const projectData = JSON.parse(`{${rawJson}}`)
        Object.assign( this.project, projectData );
        console.log(rawHtml);
        console.log(projectData);
      }
    });
  }

  save(){
    const projectString = JSON.stringify(this.project, null, 2).replace(/\n\s+/g,'\n');
    const jsonData = projectString.substr(1,projectString.length-2).trim();
    const separator = '---'
    const htmlData = this.formatHTML(this.getStage().innerHTML.trim());
    const data = [jsonData, separator, htmlData].join('\n');

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
