
![v8engine](https://68.media.tumblr.com/beb3da6797ff6696dead6bc88d89f10c/tumblr_okhid3YvQM1ru9jhqo1_1280.jpg)

## Say what?
V8Engine is nothing more than a simple abstraction that wraps the internal Node.js V8 engine located in module <i>vm</i> to an instantiatable class that provides a number of methods that behave similar to the implementation of <i>V8ScriptEngine</i> in <a href="https://clearscript.codeplex.com/">Microsoft.ClearScript.V8</a>.

### Install

```bash
npm install V8Engine
```

### Example | evaluate some code

```js
/* initialize */
const V8Engine = require('v8engine')

/* create a new v8 engine */
var ctx = new V8Engine()

/* evaluate (run) code inside it */
ctx.run('let x = 4')
ctx.run('x = x + 2')
```

### Example | understand the following

<b>It is important to realize that your context does not have a function <i>require</i> or even <i>console.log</i> because those are context specific implementations and not part of the EcmaScript language itself. </b>

```js
/* this does not work */
const V8Engine = require('v8engine')
var ctx = new V8Engine()

ctx.run('console.log(12345)') /* ReferenceError: console is not defined. */
```

### Example || expose the console 

```js
const V8Engine = require('v8engine')
var ctx = new V8Engine()

/* Creates a variable 'log' and assigns console.log from current process */
ctx.addHostType('log', console.log)

/* You can also just expose the entire console */
ctx.addHostObject('console', console)
```

### Example | the difference between addHostObject and addHostType

Similar to Microsoft.ClearScript.V8 as mentioned earlier, V8Engine distinguishes between an <b>host object</b> (any type of variable in your process) and a <b>host type</b> (callable). This simply means that a type is an object with a constructor like a function or class in C# or any other Object-Oriented language and a host Object is an instance of something. In particular case, any variable in your Node application can be assigned as a host object because we are talking Javascript and everything is an Object of some sorts. Yes. This could be considered slightly inconsistent of me because you can assign a function using addHostType because it is callable but in the real world outside Javascript, a type (class) returns an instance of itself.

```js
/* this works fine */
ctx.addHostObject('require', require) 
ctx.addHostType('User', class User {
	constructor(name, age) {
		this.name = name
		this.age = age
	}
})
ctx.addHostType('httpServer', require('http').createServer)

/* this fails */
ctx.addHostType('something', 55) // exception: target is not a constructor (number)
ctx.addHostObject({
	foo: bar 
}, 'moo!') // exception: unexpected object, expecting string identifier
```

### Example | get the context

The method getContext() returns the internal v8 context as Object. 

```js
var ctx = new V8Engine()
ctx.run('let a = 1; let b = "hello"')
ctx.getContext()
/* returns
{
	a: 1, 
	b: 'hello'
}
*/
```

Note: if you are using NW.js or Electron, the vm module of Node.js behaves differently. Variables set using <i>let</i> will not be properties of the context object. This is not my fault but a minor inconsistency in their product. I have not reported this 'bug' because I am lazy.

### Example || initialize V8Engine with a context

```js
var ctx = new V8Engine({
	require: require, 
	console: console, 
	foo: 'bar'
})
/* ctx will already have a variable require, console and foo */
```

### Example | clone 

Creates a new V8Engine with current context. 

```js
let ctx = new V8Engine()
ctx.addHostObject('myData', {
	property: 'awesomeSauce', 
	method: function(stuff) {
		return require('someModule').methodName(stuff)
	}
})

var ctx2 = ctx.clone() 
/* ctx2 is instance of V8Engine with all the variables of ctx but does not affect ctx when updated */
```

## That was all!

Module V8Engine is properly documented and commented so if you want to learn how it works internally, open index.js and read all my awesome explanations.

Until next time.

<hr/>
<img src="http://33.media.tumblr.com/avatar_048a728a1488_128.png"><hr/>

# Jochem Stoel

Involuntary public figure.
<ul>
<li> https://www.npmjs.com/~jochemstoel</li>
<li> http://jochemstoel.github.io/</li>
<li> https://www.quora.com/profile/Jochem-Stoel/</li>
<li> https://jochemstoel.tumblr.com/</li>
<li> https://jochemstoel.nl/</li>
<li> https://www.facebook.com/Jochem-Stoel-271292656217087/</li>
</ul>
