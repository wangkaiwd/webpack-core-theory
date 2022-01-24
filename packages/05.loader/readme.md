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

### babel loader
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
  
api: 

* [this.getOptions](https://webpack.js.org/api/loaders/#thisgetoptionsschema)
* [this.callback](https://webpack.js.org/api/loaders/#thiscallback)



### resource
* [concepts loader](https://webpack.js.org/concepts/#loaders)
* [loaders](https://webpack.js.org/concepts/loaders/)
* [loader interface](https://webpack.js.org/api/loaders/)
* [writing a loader](https://webpack.js.org/contribute/writing-a-loader/)
