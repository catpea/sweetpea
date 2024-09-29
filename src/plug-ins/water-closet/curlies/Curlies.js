import espree from "./espree/bundle.js";
import Signal from 'signal';

// import EventEmitter from '../event-emitter/EventEmitter.js';

export default Inheritance => class Curlies extends Inheritance {


  bindDoubleCurly(){

    const elements = this.search();

    for (const element of elements) {
      if (element.hasAttributes()) {
         for (const attr of element.attributes) {
           const originalValue = attr.value;
           const dependencies = this.extractCurlyDependencies( attr.value );

           const compositeContext = {};

           for (const key of dependencies) {
             if(!this.context[key]){
               // compositeContext[key] = new Signal(this.host.getAttribute(key)); // TODO: monitor attribute in host for changes
               compositeContext[key] = new Signal(this.host.dataset[key]); // TODO: monitor attribute in host for changes
             }else{
               compositeContext[key] = this.context[key];
             }
           }

           for (const key of dependencies) {
             const subscription = compositeContext[key].subscribe( v=>element.setAttribute(attr.name, this.interpolateCurly(originalValue, compositeContext)) );
             this.subscriptions.push( {type:'set input[value]', id:key, subscription} );
           }
         }
      }
    };



    return this;
  }

  extractCurlyDependencies(template) {
    const dependencies = [];
    // Regular expression to match placeholders in the format ${property} or {{property}}
    const placeholderPattern = /{{((?:[^{}]|{[^{}]*})*)}}/g; // EXPERIMENTAL
    // Function to handle replacement
    const replaceFunction = (match, property) => {
      const tokens = espree.tokenize(property, { ecmaVersion: 2020 });
      const properties = tokens.filter(o=>o.type==='Identifier').map(o=>o.value)
      dependencies.push(...properties);
    }
    // Replace all placeholders in the template string using replaceFunction
    template.replace(placeholderPattern, replaceFunction);
    return dependencies;
  }

  interpolateCurly(template, context) {
    // Regular expression to match placeholders in the format ${property} or {{property}}
    const placeholderPattern = /{{((?:[^{}]|{[^{}]*})*)}}/g; // EXPERIMENTAL

    // Function to handle replacement
    const replaceFunction = (match, property) => {

      const compositeProgram = this.billOfValues(context) + 'return ' + property;
      const result = new Function(compositeProgram).call(context);

      // console.log('XXX', compositeProgram);
      // console.log('XXX', { result });
      return result;

    };
    // Replace all placeholders in the template string using replaceFunction
    const interpolatedString = template.replace(placeholderPattern, replaceFunction);
    return interpolatedString;
  }

  billOfValues(context){
    const valueSnapshot = [];
    for (const variableName in context) {
      const variableValue = context[variableName].get();
      // const variableValue = context[variableName].get?context[variableName].get():context[variableName];
      valueSnapshot.push(`const ${variableName} = ${JSON.stringify(variableValue)};`)
    }
    const valueHeader = valueSnapshot.join('\n') + '\n';
    //////console.log({valueHeader});
    return valueHeader + '\n';

  }

}
