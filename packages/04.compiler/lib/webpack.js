const { argsParser } = require('./args-parser.js');
const Compiler = require('./compiler.js');

function webpack (options) {
  // 1. parse arguments from command line interface
  const shellOptions = argsParser();
  const finalOptions = { ...options, ...shellOptions };
  // 2. init Compiler by options
  const compiler = new Compiler(finalOptions);
  // 3. execute all plugins
  const { plugins } = finalOptions;
  if (plugins) {
    plugins.forEach(plugin => {
      plugin.apply(compiler);
    });
  }
  return compiler;
}

module.exports = webpack
