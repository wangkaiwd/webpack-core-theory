const { ExternalModule } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class AutoExternalPlugin {
  constructor (options) {
    this.name = 'AutoExternalPlugin';
    this.options = options;
    // may be pass not used module
    this.externalModules = Object.keys(this.options);
    this.importedModules = new Set();
  }

  apply (compiler) {
    compiler.hooks.normalModuleFactory.tap(this.name, (normalModuleFactory) => {
      normalModuleFactory.hooks.parser.for('javascript/auto').tap(this.name, (parser) => {
        // imported module
        parser.hooks.import.tap(this.name, (statement, source) => {
          if (this.externalModules.includes(source)) {
            this.importedModules.add(source);
          }
        });
        // required module
        parser.hooks.call.for('require').tap(this.name, (expression) => {
          const source = expression.arguments[0].value;
          if (this.externalModules.includes(source)) {
            this.importedModules.add(source);
          }
        });
      });
      // AsyncSeriesBailHook
      normalModuleFactory.hooks.factorize.tapAsync(this.name, (resolveData, cb) => {
        const { request } = resolveData;
        if (this.externalModules.includes(request)) {
          const { variable } = this.options[request];
          // return non-undefined will stop execute subsequent hook
          // ExternalModule do what ?
          cb(null, new ExternalModule(variable, 'window', request));
        } else {
          cb(null);
        }
      });
    });
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.name, (data, cb) => {
        this.importedModules.forEach((packageName) => {
          data.assetTags.scripts.unshift({
            tagName: 'script',
            attributes: {
              src: this.options[packageName].url
            }
          });
        });
        cb(null, data);
      });
    });
  }
}

module.exports = AutoExternalPlugin;
