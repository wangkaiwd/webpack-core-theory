class AssetsPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('AssetsPlugin', (compilation, compilationParams) => {
      compilation.hooks.chunkAsset.tap('AssetsPlugin', (chunk, filename) => {
        // filename: main.js
        console.log('chunkAsset', chunk, filename);
      });
    });
  }
}

module.exports = AssetsPlugin;

// const events = {}
// events.move = new SyncHook('arg1','arg2')
// events.click = new SyncHook('arg1','arg2')
// events.move.call('1','2')
// events.click.call('1','2')
