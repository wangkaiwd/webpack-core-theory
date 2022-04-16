## Loader

* [loader-runner](https://github.com/webpack/loader-runner)

### kind of loader
> * [Rule.enforce](https://webpack.js.org/configuration/module/#ruleenforce)

* pre
* normal
* inline
* post

omit(overridden) by prefixing in the request:
* `!`: omit all normal loaders
* `-!`: omit all normal and pre loaders
* `!!`: omit all normal,post and pre loaders

### how to write a loader
1. create loader
  ```js
  function loader (source) {
    // ...some code
    return source
  }
  
  module.exports = loader;
  ```
2. handle webpack loader resolve path
  ```js
  const path = require('path');
  module.exports = {
    // ... other config
    resolveLoader: {
      modules: [path.resolve(__dirname, 'loaders')]
    },
  };
  ```

### babel loader
* [this.getOptions](https://webpack.js.org/api/loaders/#thisgetoptionsschema)
* [this.callback](https://webpack.js.org/api/loaders/#thiscallback)

### file loader

copy file to dist directory and return `filename`

* [interpolateName](https://github.com/webpack/loader-utils#interpolatename)
* [this.emitFile](https://webpack.js.org/api/loaders/#thisemitfile)
* [Raw Loader](https://webpack.js.org/api/loaders/#raw-loader)

### url loader

if file larger than `limit`, use file loader process assets, otherwise convert file to base64 string and as return value

* [data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs#syntax)
* [node.js to base64](https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally)

### less loader
* [asynchronous loader](https://webpack.js.org/api/loaders/#asynchronous-loaders)
* [pitching loader](https://webpack.js.org/api/loaders/#pitching-loader)

### style loader

### implement loader runner
* [loader runner](https://github.com/webpack/loader-runner)
* [diagram](https://excalidraw.com/#json=BpyAWaFb0LpXtuKtYsCOh,IrT49B9sThSuPRG5PL6o1A)

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/Untitled-2022-01-26-1622.png)

feature:
* pitch loader execute from left to right
* normal loader execute from right to left
* if pitch loader return something, it will start execute previous normal loader
* support async or sync invoke

note: 
* not only async but also sync is execute callback after run loader and callback parameter is source code

### resource
* [concepts loader](https://webpack.js.org/concepts/#loaders)
* [loaders](https://webpack.js.org/concepts/loaders/)
* [loader interface](https://webpack.js.org/api/loaders/)
* [writing a loader](https://webpack.js.org/contribute/writing-a-loader/)
