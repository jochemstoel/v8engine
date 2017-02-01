/* V8Engine wrapper class for internal v8 engine in module vm
 *
 * @package V8Engine
 * @author  Jochem Stoel (jochemstoel.github.io)
 * @npm     //
 * @more    //
 * @version 0.0.2
 */

function V8Engine(init = false) { /* new: optional argument init sets initial context */

	/* Checks if a variable is (callable) class or (arrow) function */
	const isCallable = require('is-callable')

	if(!(this instanceof V8Engine)) {
		throw `V8Engine is instanciated by using 'new V8Engine()'`
	}

	/* module vm contains V8 engine */
	const vm = require('vm')

	/* Create a new context, either empty or the value of argument init */
	const context = new vm.createContext(typeof init == 'object' ? init : {})

	/* Evaluate (run) Javascript code */
	this.run = script => {

		/* Scriptify input string and run it in current context */
		new vm.Script(script).runInContext(context)
		return this /* for chainability */
	}

	/* Assign (any) variable to the context of current instance */
	this.addHostObject = (identifier, target) => {

		/* Check if developer smart enough to provide a value */
		if(typeof target == 'undefined')
			throw `missing argument 'target'`

		/* Check if first argument is a valid identifier (string) */
		if(typeof identifier != 'string') {
			let type = identifier.constructor.name
			throw `unexpected ${type}, expecting string identifier`
		}

		/* Assign target to context of current instance as identifier */
		context[identifier] = target
		return this /* for chainability */
	}

	/* Assign a type to the context of current instance
	 * a type is anything callable, like a function or class and not a string or object
	 */
	this.addHostType = (identifier, target) => {

		/* Check if first argument is a valid identifier (string) */
		if(typeof identifier != 'string') {
			let type = typeof identifier
			throw `unexpected ${type}, expecting string identifier`
		}

		/* First check if target type is function, this is a workaround 
		 * because module is-callable does not understand classes
		 */
		if(typeof target != 'function') {
			if(!isCallable(target)) {
				let type = typeof target
				throw `target is not a constructor (${type})`
			}
		}

		/* Assign target to context of current instance as identifier */
		context[identifier] = target
		return this /* for chainability */
	}

	/* Get the current context */
	this.getContext = () => context

	/* Initialize a new instance of V8Engine with current context */
	this.clone = () => new V8Engine(context)

	return this
}

module.exports = V8Engine