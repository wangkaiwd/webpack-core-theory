## Loader

* [loader-runner](https://github.com/webpack/loader-runner)

![](https://cdn.jsdelivr.net/gh/wangkaiwd/drawing-bed/Untitled-2021-05-15-1622.png)

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
* [interpolateName](https://github.com/webpack/loader-utils#interpolatename)
* [this.emitFile](https://webpack.js.org/api/loaders/#thisemitfile)
* [Raw Loader](https://webpack.js.org/api/loaders/#raw-loader)

### url loader
* [data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs#syntax)
* [node.js to base64](https://stackoverflow.com/questions/24523532/how-do-i-convert-an-image-to-a-base64-encoded-data-url-in-sails-js-or-generally)

### less loader
* [asynchronous loader](https://webpack.js.org/api/loaders/#asynchronous-loaders)
* [pitching loader](https://webpack.js.org/api/loaders/#pitching-loader)

### resource
* [concepts loader](https://webpack.js.org/concepts/#loaders)
* [loaders](https://webpack.js.org/concepts/loaders/)
* [loader interface](https://webpack.js.org/api/loaders/)
* [writing a loader](https://webpack.js.org/contribute/writing-a-loader/)
