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
    // use production environment
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
                  // modules: flase, preserve ES modules
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

### build library
* [module-definition-systems](https://webpack.js.org/configuration/output/#module-definition-systems)
