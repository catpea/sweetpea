export default class XmlTokenizer {
  #rules = [];

  constructor() {
    this
      .addRule({ type: 'WHITESPACE' }, /^\s+/, {ignore:true})
      .addRule({ type: 'SELFCLOSE_TAG'}, /^<(?<tagName>[a-zA-Z_-]+)\s*(?<attributes>[^>]*)\/>/)
      .addRule({ type: 'OPEN_TAG'}, /^<(?<tagName>[a-zA-Z_-]+)\s*(?<attributes>[^\/>]*)>/)
      .addRule({ type: 'COMMENT' }, /^<!--(?<comment>[\s\S]*?)-->/, {value:'comment'})
      .addRule({ type: 'CLOSE_TAG'}, /^<\/(?<tagName>[a-zA-Z_-]+)>/)
      .addRule({ type: 'TEXT'}, /^(?<text>[^<]+)/, {value:'text'})
  }

  addRule(base, expression, options = {}) {
    this.#rules.push({ base, expression, options});
    return this;
  }

  getPosition(str, index) {
      if (index === 0) return [1, 1];
      const processed = str.slice(0, index + 1);
      const split = processed.split('\n');
      const lines = split.length;
      const characters = split[lines - 1].length;
      return [lines, characters];
  }

  tokenize(xmlStr) {
    const tokens = [];
    let currentIndex = 0;

    while (currentIndex < xmlStr.length) {

      let matched = false;

      for (const { base, expression, options } of this.#rules) {

        const string = xmlStr.slice(currentIndex);
        const match = expression.exec(string);


        if (match) {
          // console.info(`parsing: ${string.substr(0,128).replace(/\n/g,'\\n')}..`)
          // console.info(`match: ${match[0]}`,match)

          matched = true;

          const str = match[0];
          const len = str.length;
          const pos = this.getPosition(xmlStr, currentIndex).join(':');

          if(!options.ignore){
            // const nxt = xmlStr.slice(currentIndex+len);
            // cons/t token1 = Object.assign({   DATA:string, MATCH:str,len, pos   }, { ...base }, match.groups);
            const groups = Object.fromEntries( Object.entries(match.groups).map(([k, v]) => [k, v.trim()]) );
            const token = Object.assign({ ...base }, groups);
            if (token.attributes) token.attributes = this.parseAttributes(token.attributes);
            if (options.value) token.value = token[options.value];
            tokens.push(token);
          }

          currentIndex += len; // Move the index forward
          break; // Break out of the loop to restart with the new index
        } // if match

      } // evaluate rules

      if (!matched) {
        // If no rule matched, we have an invalid XML string section
        throw new Error(`Unexpected token at index ${currentIndex} (${this.getPosition(xmlStr, currentIndex).join(':')})`);
      }

    }

    return tokens;
  }

  parseAttributes(attributesString) {
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
