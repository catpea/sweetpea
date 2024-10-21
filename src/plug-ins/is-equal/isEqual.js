export default function isEqual(value1, value2) {
    // Check if both values are primitives
    const areBothPrimitives = (val1, val2) => (typeof val1 !== 'object' && val1 !== null) && (typeof val2 !== 'object' && val2 !== null);
    if (areBothPrimitives(value1, value2)) {
        return value1 === value2;
    }

    // Check if both values are arrays
    const areBothArrays = Array.isArray(value1) && Array.isArray(value2);
    if (areBothArrays) {
        const sameLength = value1.length === value2.length;
        if (!sameLength) return false;
        for (let i = 0; i < value1.length; i++) {
            if (!isEqual(value1[i], value2[i])) return false;
        }
        return true;
    }

    // Check if both values are plain objects
    const areBothObjects = typeof value1 === 'object' && typeof value2 === 'object' && value1 !== null && value2 !== null;
    if (areBothObjects) {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        const sameKeys = keys1.length === keys2.length && keys1.every(key => keys2.includes(key));
        if (!sameKeys) return false;
        for (let key of keys1) {
            if (!isEqual(value1[key], value2[key])) return false;
        }
        return true;
    }

    // Fallback for non-matching types or unsupported structures
    return false;
}
