const utils = require('loader-utils');

/**
 * @param content
 * @return {*}
 */
function loader (content) {
  const defaultOptions = {
    filename: '[hash:8].[ext]'
  };
  const options = { ...defaultOptions, ...this.getOptions() };
  const filename = utils.interpolateName(this, options.filename, { content });
  this.emitFile(filename, content);
  return `module.exports = ${JSON.stringify(filename)}`;
}

loader.raw = true;
module.exports = loader;
