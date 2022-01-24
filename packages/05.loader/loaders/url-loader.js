const mime = require('mime');

function loader (content) {
  const defaultOptions = {
    filename: '[hash:8].[ext]'
  };
  const options = { ...defaultOptions, ...this.getOptions() };
  const type = mime.getType(this.resourcePath);
  const { limit } = options;
  if (limit && limit > content.length) {
    const base64 = `data:${type};base64,${content.toString('base64')}`;
    return `module.exports = ${JSON.stringify(base64)}`;

  } else {
    const fileLoader = require('./file-loader');
    return fileLoader.call(this, content);
  }
}

loader.raw = true;

module.exports = loader;
