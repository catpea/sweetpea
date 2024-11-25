const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor; // Get the constructor for async functions to identify them later

/*
  Concepts:

  Proxy: A proxy in JavaScript allows you to intercept and redefine fundamental operations for an object, such as property access.
  Chaining: This code enables method chaining, allowing you to call multiple mock methods in a sequence and then execute them when run is called.
  Asynchronous Handling: Methods can be both synchronous and asynchronous, and the code handles both cases. It uses the constructor check to determine if a function is asynchronous.
  Program Array: This stores each command as an object with details necessary to execute it later. Commands know if they are asynchronous and their original function context.
  Verbosity: A simple option to log information about what is happening inside run, which can help for debugging or understanding the flow of execution.

*/

export default function macro(that) {

    // Array to hold functions or promises to be executed in order
    const program = [];

    // Create a Proxy to intercept property accesses on 'this' instance
    let proxy = new Proxy(that, {
      get(target, property) {

        // These properties ('then' and 'catch') are used by promises, so we treat them specially
        if (property === 'then' || property === 'catch') {
          return undefined; // Make sure these aren't interfered with
        }

        if (property == 'run') {
          // When 'run' is called, execute all stored functions asynchronously in order
          return async ({ verbosity } = { verbosity: 0 }) => {
            if (verbosity) console.log('Cheerfully executing', program.map(o => o.name).join(' '));
            for (const command of program) {
              if (command.asynchronous) {
                await command.function();
              }else{
                command.function();
              }
            }
          };
        } else {
          // Check if the property is a function on the target object
          const isFunction = typeof target[property] === 'function';
          if (!isFunction) throw new Error(`Property ${property} is not a callable function`);

          // Determine if the function is asynchronous by comparing its constructor
          const asynchronous = target[property].constructor === AsyncFunction;

          // Create a command object with details about the function
          const command = {
            name: property, // The name of the function or method
            asynchronous, // Whether the function is async or not
            function: target[property].bind(target) // The function itself, bound to the target
            // function: async ()=> await target[property]()
          };

          // Add the command to the program array to be executed later
          program.push(command);

          // Note: The following code would allow capturing method arguments, but it's commented out
          // because you currently want the basic function name chaining behavior
          // return (...args) => {
          //   program.push(() => method.apply(target, args));
          //   return proxy; // Continue chaining
          // };

          return proxy; // Return the proxy again to allow method chaining
        }
      },
    });

    return proxy; // Return the proxy to interact with via chaining

}
