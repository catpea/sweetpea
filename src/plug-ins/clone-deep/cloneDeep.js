export default function cloneDeep(input) {
  // Base case: if input is null or not an object, return it directly
  if (input === null || typeof input !== 'object') {
    return input;
  }

  // Handle array types
  if (Array.isArray(input)) {
    return input.map(element => cloneDeep(element));
  }

  // Handle object types
  const clonedObject = {};
  Object.keys(input).forEach(key => {
    clonedObject[key] = cloneDeep(input[key]);
  });

  return clonedObject;
}
