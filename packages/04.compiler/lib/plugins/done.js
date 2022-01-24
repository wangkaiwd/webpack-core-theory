class DonePlugin {
  constructor () {

  }

  apply (compiler) {
    console.log('done');
    compiler.hooks.run.tap('DonePlugin', () => {
      console.log('Done: complete compile');
    });
  }
}

module.exports = DonePlugin;
