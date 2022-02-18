const JSZip = require('jszip');

class ArchivePlugin {
  constructor (options) {
    this.options = options;
    this.name = 'ArchivePlugin';
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('ArchivePlugin', (compilation, cb) => {
      const zip = new JSZip();
      const { assets } = compilation;
      Object.keys(assets).forEach(filename => {
        zip.file(filename, assets[filename].source());
      });
      // https://stuk.github.io/jszip/documentation/api_jszip/generate_async.html#type-option
      zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
        assets[`bundle.zip`] = {
          source () {return content;}
        };
        cb();
      });
    });
  }
}

module.exports = ArchivePlugin;
