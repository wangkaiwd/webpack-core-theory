const core = require('@babel/core');

function loader (source) {
  const defaultOptions = {
    inputSourceMap: true,
    presets: ['@babel/preset-env'],
    sourceMaps: true,
    sourceFileName: this.resourcePath
  };
  const options = { ...defaultOptions, ...this.getOptions() };

  const { code, map, ast } = core.transformSync(source, options);
  // return code;
  // return multiple value
  return this.callback(null, code, map, ast);
}

module.exports = loader;
