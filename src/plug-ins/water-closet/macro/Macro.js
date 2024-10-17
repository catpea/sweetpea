const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor;

export default Inheritance => class Macro extends Inheritance {

  get macro(){
    // stores promises/functions to be executed
    const metadata = [];
    const program = [];
    let proxy = new Proxy(this, {
      get(target, property) {
        if (property === 'then' || property === 'catch') { return undefined; } // Let the Proxy work as a Promise when awaited

        if(property == 'run'){
          // Return a promise that resolves when all functions are executed
          return async ({verbosity}={verbosity:0}) => {
            if(verbosity) console.log('Cheerfully executing', metadata.join(' '));
            for (const subroutine of program) {
              try {
               await subroutine();
             } catch (error) {
               console.error(`Error executing subroutine: ${error}`, metadata);
             }
            }
          };

        } else {

          const isFunction = typeof target[property] === 'function';
          if (!isFunction) throw new Error(`Property ${property} is not a callable function`)

          //NICE TO KNOW: const isAsync = target[property].constructor === AsyncFunction;

          program.push( target[property].bind(target) );
          metadata.push( property );

          // AVOID Capture method calls with arguments
          // return (...args) => {
          // program.push(() => method.apply(target, args));
          // return proxy; // Return the proxy for chaining
          // };

          return proxy;
        }
      },
    });
    return proxy;
  }

}
