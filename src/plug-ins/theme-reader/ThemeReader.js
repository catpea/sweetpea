export default class ThemeReader {
  constructor(htmlString) {
    const parser = new DOMParser();
    this.doc = parser.parseFromString(htmlString, 'text/html');
    this.templateCache = new Map(); // Cache for templates
  }

  template(id) {

    // Check cache first
    if (this.templateCache.has(id)) {
      const clone = this.templateCache.get(id).cloneNode(true);
      return clone;
    }

    const template = this.doc.getElementById(id);
    if (template) {
      // Clone the content of the template
      const clone = document.importNode(template.content, true);
      const fragment = document.createDocumentFragment();

      // Filter out text nodes
      for (let node of clone.childNodes) {
        if (node.nodeType !== Node.TEXT_NODE) {
          fragment.appendChild(node.cloneNode(true));
        }
      }

      // If there are remaining nodes, wrap them in a <span>
      if (fragment.childNodes.length > 1) {

        const span = document.createElement('span');
        span.appendChild(fragment);
        this.templateCache.set(id, span); // Cache the result
        return span.cloneNode(true);

      } else {
        this.templateCache.set(id, fragment); // Cache the result
        return fragment.cloneNode(true); // Return the bare fragmant
      }

    } else {
      console.error(`Template "${id}" not found`);
      return document.createDocumentFragment(); // Return empty fragment as default
    }
  }
}
