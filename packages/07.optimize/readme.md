## Optimize

* [resolve.mainFields](https://webpack.js.org/configuration/resolve/#resolvemainfields)
* [IgnorePlugin](https://webpack.js.org/plugins/ignore-plugin/)
  * moment
* [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)
* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* [purgecss-webpack-plugin](https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin)
  * must specify html file
  * must usage combine with MiniCssExtractPlugin
* [thread-loader](https://github.com/webpack-contrib/thread-loader)
* [tree shaking](https://webpack.js.org/guides/tree-shaking/): production mode will auto enable
  ```js
  module.exports = {
    // 1. use production environment
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  // https://babeljs.io/docs/en/babel-preset-env#modules
                  // enable transformation of ES module syntax to another module type  
                  // 2. modules: flase, preserve ES modules
                  ['@babel/preset-env', { modules: false }]
                ]
              }
            }
          ]
        }
      ]
    },
  }
  ```
  `package.json`
  ```json
  {
    "sideEffects": ["*.css"]
  }
  ```
* [scope hoisting](https://webpack.js.org/plugins/module-concatenation-plugin/)
* [cache](https://webpack.js.org/configuration/cache/)

### [code splitting](https://webpack.js.org/guides/code-splitting/)

* multiple entry
* dynamic import
* split chunk
* preload
  * [preload-webpack-plugin](https://github.com/vuejs/preload-webpack-plugin)
* prefetch
* [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)
* [runtimeChunk](https://webpack.js.org/configuration/optimization/#optimizationruntimechunk)

### SplitChunksPlugin demo

entry1:
* -> module1
* -> module2
* -> jquery
* -> asyncModule1 -> lodash

entry2:
* -> module1
* -> module2
* -> jquery

entry3:
* -> module1
* -> module3
* -> jquery

### build library
* [module-definition-systems](https://webpack.js.org/configuration/output/#module-definition-systems)
