import XmlLexer from './XmlLexer.js';
import XmlTokenizer from './XmlTokenizer.js';

export default class XmlParser {
  #xmlTokenizer;
  #xmlLexer;

  constructor() {
    this.#xmlTokenizer = new XmlTokenizer();
    this.#xmlLexer = new XmlLexer();
  }
  parse(xmlStr) {
    const tokens = this.#xmlTokenizer.tokenize(xmlStr);
    const ast = this.#xmlLexer.createAst(tokens);
    // console.dir(tokens);
    // console.dir(ast);
    console.log(JSON.stringify(ast, null, 2));
    return ast;
  }
}
