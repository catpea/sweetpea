export default class XmlParser {
  captureText = true;
  captureComments = false;
  constructor() {
  }
  parse(xml) {
    const root = { tagName: "root", attributes: {}, children: [] };
    this.descend(root, xml);
    return root;
  }
  descend(parent, xml) {
    const tagPattern = /<(?<name>\w+)(?<attributes>[^>]*)>(?<content>.*?)<\/\1>|<(?<name>\w+)(?<attributes>[^>]*)\/>|<!--(?<comment>[\s\S]*?)-->|(?<text>[^<]+)/gs;
    let match;
    while ((match = tagPattern.exec(xml.trim())) !== null) {
      const isText = match.groups.name === undefined && match.groups.text?.trim();
      const isComment = match.groups.name === undefined && match.groups.comment?.trim();
      const isTag = match.groups.name;
      if (isText && this.captureText) {
        parent.children.push(match.groups.text.trim());
      } else if (isComment && this.captureComments) {
        parent.children.push({ comment: match.groups.comment.trim() });
      } else if (isTag) {
        const node = {
          tagName: match.groups.name,
          attributes: this.#parseAttributes(match.groups.attributes),
          children: [],
        };
        if (match.groups.content?.trim()) this.descend(node, match.groups.content);
        parent.children.push(node);
      }
    }
  }

  #parseAttributes(attributesString) {
      const attributes = {};
      const attrPattern = /(\w+)=("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')/g;
      let match;
      while ((match = attrPattern.exec(attributesString)) !== null) {
        const name = match[1];
        const value = match[2].slice(1, -1).replace(/\\(["'])/g, "$1"); // Remove quotes and unescape
        attributes[name] = value;
      }
      return attributes;
  }
}
