# Typescript (JS) wrapper for SocketStream 0.3

Allows you to use [Typescript](http://www.typescriptlang.org/) files (.ts) in your SocketStream project.

### Instructions

Add `ss-typescript` to your application's `package.json` file and then add this line to app.js:

```javascript
ss.client.formatters.add(require('ss-typescript'));
```

#### Remarks
The Typescript.api module does not automatically reference the lib.d.ts file which describes javascript capabilities of the browser
(see [Here](https://npmjs.org/package/typescript.api#declarations) for details).

In order to avoid compiler errors when using things like ```javascript console.log``` or ```javascript alert``` you will need to include the definition files manually.
The typescript.api project did this by design so as not to bloat compile jobs that didn't need all of the browser definitions (i.e. a node project).

I suggest going into the ```node_modules/ss-typescript/node_modules/typescript.api/decl/``` and grabbing the definition files that you care about and reference them
in your own files.  This isn't an ideal solution, but it works around the problem.

I have a ***clientLibs.d.ts*** file which contains all of the references need by my client code including ***lib.d.ts***
