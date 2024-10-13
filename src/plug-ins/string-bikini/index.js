export function quot(input) {
  return JSON.stringify(input)
}

export function toClass(str, lower=true) {
  console.log([...str.split(/[^a-z0-1)]/i).entries()]);
  return [...str.split(/[^a-z0-1)]/i).entries()]
  .map(([index, word]) => (index==0&&lower?word.charAt(0).toLowerCase():word.charAt(0).toUpperCase()) + word.slice(1).toLowerCase()) // Capitalize first letter
  .join(''); // Join without spaces
}

export function toInstance(str) {
  return toClass(str, true)
}

export function toProperty(str) {
  return toInstance(str)

}

export default { quot, toClass, toInstance, toProperty }
