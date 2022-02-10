class DonePlugin {
  constructor (options) {
    this.options = options;
  }

  apply (compiler) {
    // done: asyncSeriesHook
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('stats');
    });

    compiler.hooks.done.tapAsync('DonePlugin', (stats, cb) => {
      console.log('stats tapAsync');
      cb();
    });
  }
}

module.exports = DonePlugin;
