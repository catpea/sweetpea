export default class SnapSnip {
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
