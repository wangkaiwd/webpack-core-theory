const core = require('@babel/core');
const defaultOptions = {
  inputSourceMap: true,
  presets: ['@babel/preset-env']
};

function loader (source) {
  const options = this.getOptions() || defaultOptions;
  const { code, map, ast } = core.transformSync(source, options);
  // return code;
  // return multiple value
  return this.callback(null, code, map, ast);
}

module.exports = loader;
