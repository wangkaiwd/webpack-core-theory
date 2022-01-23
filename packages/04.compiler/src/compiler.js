const { SyncHook } = require('tapable');
const Compilation = require('./compilation.js');
const fs = require('fs');
const { forEach } = require('./util');
const path = require('path');

function writeFile (filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, data);
}

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
    const { entry, output } = this.options;
    // call,tap
    this.hooks.run.call();
    this.compile((err, stats) => {
      forEach(stats.assets, (filename, source) => {
        writeFile(path.resolve(output.path, filename), source);
      });
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
