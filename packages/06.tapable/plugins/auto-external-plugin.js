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
      normalModuleFactory.hooks.factorize.tapAsync(this.name, (resolveData, cb) => {
        console.log('request', resolveData.request);
      });
    });
  }
}

module.exports = AutoExternalPlugin;
