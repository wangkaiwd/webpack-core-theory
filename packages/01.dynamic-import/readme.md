## lazy load

import code when it used

1. dynamic create script with src
2. because of script file will load asynchronous so create a Pending Promise
3. script asynchronous execute:
   1. add module correspond to script to global modules(will employ a global variable `self['webpackChunkdynamic_import']`)
   2. execute promise resolve method
4. require moduleId of script in next `promise.then` method
5. get `{default: module.exports}` in last `promise.then` method

source code [in there](./demo/main.js)

**note: insert script programmatic will async load js file**
```js
const loadScript = require.l = (chunkId) => {
  const script = document.createElement('script');
  script.src = chunkId + '.main.js';
  document.head.appendChild(script);
  script.onload = () => { // the moment have executed js code inside new insert script
    // do something after script loaded
  };
};
```



### Resource

* [Understanding the Critical Rendering Path](https://bitsofco.de/understanding-the-critical-rendering-path/)
