# Typescript (JS) wrapper for SocketStream 0.3

Allows you to use [Typescript](http://www.typescriptlang.org/) files (.ts) in your SocketStream project.


### Instructions

Add `ss-typescript` to your application's `package.json` file and then add this line to app.js:

```javascript
ss.client.formatters.add(require('ss-typescript'));
```
