const { forEach } = require('./util.js');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const path = require('path');

const toUnixPath = (path) => {
  return path.replace(/\\/g, '/');
};

const cwd = toUnixPath(process.cwd());

class Compilation {
  constructor (options) {
    this.options = options;
    this.normalizeOptions();
  }

  normalizeOptions () {
    const { entry, context } = this.options;
    if (typeof entry === 'string') {
      entry.main = entry;
    }
    this.options.context = context || process.cwd();
  }

  build (callback) {
    const { entry } = this.options;
    forEach(entry, (key, val) => {
      this.buildModule(key, val);
    });
    callback(null, {
      toJson () {
        return {
          assets: true,
          chunks: true,
          modules: true,
          entries: true
        };
      }
    });
  }

  buildModule (name, modulePath) {
    let sourceCode = fs.readFileSync(modulePath);
    const { rules } = this.options.module;
    const loaders = rules.reduce((loaders, { test, use }) => {
      if (test.test(modulePath)) {loaders.push(...use);}
      return loaders;
    }, []);
    sourceCode = loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode);
    }, sourceCode);
    this.buildDepModule(sourceCode, modulePath);
  }

  buildDepModule (sourceCode, modulePath) {
    const ast = parser.parse(sourceCode, { sourceType: 'module' });
    traverse.default(ast, {
      CallExpression: ({ node }) => {
        const { name } = node.callee;
        const { value } = node.arguments[0];
        if (name === 'require') {
          const dirname = path.dirname(modulePath);
          const depModulePath = tryExtension(path.resolve(dirname, value), this.options.resolve.extensions);
          // create chunkId: relative current working directory
          const depModuleId = './' + path.relative(cwd, depModulePath);
          console.log('id', depModuleId);
          // ./src/xxx
          this.buildModule(depModuleId, depModulePath);
        }
      }
    });
  }
}

function tryExtension (modulePath, extensions) {
  extensions.unshift('');
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];
    const fullPath = modulePath + extension;
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
}

module.exports = Compilation;
