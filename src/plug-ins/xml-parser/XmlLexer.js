export default class XmlLexer {
    constructor() {}

    createAst(tokens) {
        const ast = {
            type: 'Document',
            children: [],
        };

        const stack = [ast];
        let currentParent = ast;

        for (const token of tokens) {
            if (token.type === 'OPEN_TAG') {
                const newElement = {
                    type: 'Element',
                    name: token.tagName,
                    attributes: token.attributes,
                    children: [],
                };

                currentParent.children.push(newElement);
                stack.push(newElement);
                currentParent = newElement;

            } else if (token.type === 'CLOSE_TAG') {
                if (stack.length === 0 || currentParent.name !== token.tagName) {
                    throw new Error(`Unexpected closing tag: </${token.tagName}>`);
                }
                stack.pop();
                currentParent = stack[stack.length - 1]; // Move back to the parent

            } else if (token.type === 'SELFCLOSE_TAG') {
                const newElement = {
                    type: 'Element',
                    name: token.tagName,
                    attributes: token.attributes,
                    children: [],
                };

                currentParent.children.push(newElement);
                // Self-closing tags do not change the current parent

            } else if (token.type === 'TEXT') {
                if (token.value) { // Ensure there's actual text
                    currentParent.children.push({
                        type: 'Text',
                        value: token.value,
                    });
                }
            } else if (token.type === 'COMMENT') {
                currentParent.children.push({
                    type: 'Comment',
                    value: token.value,
                });
            }
        }

        if (stack.length !== 1) {
            throw new Error(`Unmatched opening tags left in the stack.`);
        }

        return ast;
    }
}
