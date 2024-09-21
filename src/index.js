// For Registration
import Root from './plug-ins/language/Root.js';
import Bind from './plug-ins/language/Bind.js';
import Loop from './plug-ins/language/Loop.js';
import Echo from './plug-ins/language/Echo.js';

import { Scene, Program, Port, Cable, Space } from './plug-ins/vpl/import.js';

// For Export
import Signal      from './plug-ins/variables/Signal.js';









class Tokenizer {
    #tokenRegistry = [];

    registerToken(tokenName, matchFunction) {
        this.#tokenRegistry.push({ tokenName, matchFunction });
    }

    isEndOfInput(index, inputString) {
        return index >= inputString.length;
    }

    isEscapeCharacter(char) {
        return char === '\\';
    }

    handleStringMatch(inputString, currentIndex) {
        let str = '"';
        let i = currentIndex + 1;
        while (i < inputString.length && inputString[i] !== '"') {
            if (this.isEscapeCharacter(inputString[i]) && (i + 1) < inputString.length) {
                str += inputString[i] + inputString[i + 1];
                i += 2;
            } else {
                str += inputString[i];
                i++;
            }
        }

        if (i < inputString.length && inputString[i] === '"') {
            str += '"';
            return { matchedPart: str };
        }

        return null;
    }

    handleBareTextMatch(inputString, currentIndex) {
        let match = '';
        let i = currentIndex;

        while (i < inputString.length && (/[a-zA-Z0-9_]/).test(inputString[i])) {
            match += inputString[i];
            i++;
        }

        if (match) {
            return { matchedPart: match };
        }

        return null;
    }

    tokenize(inputString) {
        const tokens = [];
        let i = 0;

        while (!this.isEndOfInput(i, inputString)) {
            let matched = false;

            for (const token of this.#tokenRegistry) {
                const result = token.matchFunction(inputString, i);
                if (result) {
                    tokens.push({ tokenName: token.tokenName, value: result.matchedPart });
                    i += result.matchedPart.length;
                    matched = true;
                    break;
                }
            }

            if (!matched) {
                i++;
            }
        }

        return tokens;
    }
}

// Example match functions
const openParenMatch = (inputString, currentIndex) => {
    if (inputString[currentIndex] === '(') {
        return { matchedPart: '(' };
    }
    return null;
};

const closeParenMatch = (inputString, currentIndex) => {
    if (inputString[currentIndex] === ')') {
        return { matchedPart: ')' };
    }
    return null;
};

const stringMatch = (inputString, currentIndex) => {
    if (inputString[currentIndex] === '"') {
        return tokenizer.handleStringMatch(inputString, currentIndex);
    }
    return null;
};

const bareTextMatch = (inputString, currentIndex) => {
    return tokenizer.handleBareTextMatch(inputString, currentIndex);
};

// Create tokenizer instance
const tokenizer = new Tokenizer();
tokenizer.registerToken('open-paren', openParenMatch);
tokenizer.registerToken('close-paren', closeParenMatch);
tokenizer.registerToken('string', stringMatch);
tokenizer.registerToken('bare-text', bareTextMatch);

// Example usage
const exampleInput = '( "hello \\"world\\"" some_text )';
const tokens = tokenizer.tokenize(exampleInput);
console.log(tokens);
// Output:
// [
//   { tokenName: 'open-paren', value: '(' },
//   { tokenName: 'string', value: '"hello \\"world\\""' },
//   { tokenName: 'bare-text', value: 'some_text' },
//   { tokenName: 'close-paren', value: ')' }
// ]



























async function install(prefix='data', css=['css/style.css', 'css/bootstrap.min.css','css/bootstrap-icons.min.css']){

  for (const url of css) {
    const response = await fetch(url);
    const str = await response.text();
    const css = new CSSStyleSheet();
    css.replaceSync(str);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, css];
  }

  customElements.define(`${prefix}-loop`, Loop);
  customElements.define(`${prefix}-echo`, Echo);
  customElements.define(`${prefix}-bind`, Bind);

  customElements.define(`root-space`,   Space);
  customElements.define(`${prefix}-scene`,   Scene);
  customElements.define(`${prefix}-program`, Program);
  customElements.define(`${prefix}-port`,    Port);
  customElements.define(`${prefix}-cable`,   Cable);

  customElements.define(`${prefix}-root`, Root);



}

export {
  Signal,
  install,
  signalize,
}

// TODO: generalize .children into typeof = array
function signalize(root){
  for (const branch of root) {
    // all the children of every branch
    if(branch.children) branch.children = signalize(branch.children);
    // all properties of every branch
    for (const key in branch) {
      if(key === 'children') continue;
      branch[key] = new Signal( branch[key] );
    }
  }
  // convert every branch in root
  root = root.map(o=>new Signal( o ))
  // convert root
  root = new Signal( root );
  return root
}
