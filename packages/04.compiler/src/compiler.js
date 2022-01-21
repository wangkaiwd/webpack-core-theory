const { SyncHook } = require('tapable');
const Compilation = require('./compilation.js');
const fs = require('fs');

class Compiler {
  constructor (options) {
    this.options = options;
    this.hooks = {
      run: new SyncHook(),
      done: new SyncHook()
    };
  }

  compile (callback) {
    const compilation = new Compilation(this.options);
    compilation.build(callback);
  }

  run (callback) {
    const { entry } = this.options;
    // call,tap
    this.hooks.run.call();
    this.compile((err, stats) => {
      callback(err, stats);
    });
    this.hooks.done.call();
    // Object.values(entry).forEach(e => {
    //   fs.watchFile(e, (curr, prev) => {
    //     // watch file change for recompile
    //     console.log('pre', curr, prev);
    //     this.compile(callback);
    //   });
    // });
  }
}

module.exports = Compiler;
