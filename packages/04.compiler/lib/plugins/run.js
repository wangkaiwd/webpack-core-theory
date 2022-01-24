class RunPlugin {
  constructor () {
  }

  apply (compiler) {
    // console.log('run');
    compiler.hooks.run.tap('RunPlugin', () => {
      console.log('run: start compile');
    });
  }
}

module.exports = RunPlugin;
