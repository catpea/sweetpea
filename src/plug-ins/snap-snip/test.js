import SnapSnip from './SnapSnip.js'

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
const tokenizer = new SnapSnip();
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
