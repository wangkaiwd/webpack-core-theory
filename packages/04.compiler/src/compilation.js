const { forEach } = require('./util.js');
const fs = require('fs');
const parser = require('@babel/parser');
const types = require('@babel/types');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator').default;
const path = require('path');

const toUnixPath = (path) => {
  return path.replace(/\\/g, '/');
};

const cwd = toUnixPath(process.cwd());

class Compilation {
  constructor (options) {
    this.options = options;
    this.normalizeOptions();
    // modules: [{name:'main', id: './src/main.js', _source:'xx'}, {name: 'main', id: './src/title.js', _source:'xxx'}}]
    // module: {name:'main',depModules:[]}
    this.modules = [];
    this.chunks = [];
    this.assets = {};
    this.entries = [];
    this.files = [];
  }

  normalizeOptions () {
    const { entry, context } = this.options;
    if (typeof entry === 'string') {
      entry.main = entry;
    }
    this.options.context = context || process.cwd();
  }

  build (callback) {
    const { entry, output } = this.options;
    forEach(entry, (key, val) => {
      const entryModule = this.buildModule(key, path.resolve(val));
      const chunk = {
        name: key,
        entryModule,
        modules: this.modules.filter(m => m.name === key)
      };
      this.chunks.push(chunk);
      this.entries.push({ [key]: { name: key, chunks: this.chunks } });
    });
    this.chunks.forEach(chunk => {
      const filename = output.filename.replace('[name]', chunk.name);
      this.assets[filename] = getSource(chunk);
    });
    this.files = Object.keys(this.assets);
    callback(null, {
      assets: this.assets,
      chunks: this.chunks,
      modules: this.modules,
      entries: this.entries,
      files: this.files
    });
  }

  buildModule (name, modulePath) {
    const sourceCode = this.runLoaders(modulePath);
    const moduleId = './' + path.relative(cwd, modulePath);
    const module = { id: moduleId, name, dependencies: [] };
    this.buildDepModule(name, sourceCode, modulePath, module);
    // depModuleName
    // [{id,name,dependencies:[{depModuleName,depModuleId}]}, {}]
    // this return value use to get entry module and dep module
    return module;
  }

  runLoaders (modulePath) {
    let sourceCode = fs.readFileSync(modulePath);
    const { rules } = this.options.module;
    const loaders = rules.reduce((loaders, { test, use }) => {
      if (test.test(modulePath)) {loaders.push(...use);}
      return loaders;
    }, []);
    return loaders.reduceRight((sourceCode, loader) => {
      return require(loader)(sourceCode);
    }, sourceCode);
  }

  createCallExpression (modulePath, module) {
    return ({ node }) => {
      const { name } = node.callee;
      const { value } = node.arguments[0];
      if (name === 'require') {
        const dirname = path.dirname(modulePath);
        const depModulePath = tryExtension(path.resolve(dirname, value), this.options.resolve.extensions);
        // create chunkId: relative current working directory
        const depModuleId = './' + path.relative(cwd, depModulePath);
        module.dependencies.push({ depModuleId, depModuleName: value });
        node.arguments = [types.stringLiteral(depModuleId)];
      }
    };
  }

  buildDepModule (name, sourceCode, modulePath, module) {
    const ast = parser.parse(sourceCode, { sourceType: 'module' });
    traverse.default(ast, { CallExpression: this.createCallExpression(modulePath, module) });
    const { code } = generate(ast);
    module._source = code;
    module.dependencies.forEach(dep => {
      // ./src/xxx
      this.modules.push(this.buildModule(name, dep.depModuleId));
    });
  }
}

function getSource (chunk) {
  const source = chunk.entryModule._source;

  return `
  (() => {
    const modules = {
      ${chunk.modules.map(m => `'${m.id}': (module,exports,require) => {
        ${m._source}
      }`).join(',')}
    }
    const cache = {}
    function require(moduleId) {
      // have cache return directly
      if(cache[moduleId]) {
        return cache[moduleId].exports
      }
      // add new cache
      const module = cache[moduleId] = { exports: {} }
      // change module.exports in module
      modules[moduleId](module,module.exports,require)
      return module.exports
    }
    // directly execute entry module code
    (()=> {
      ${source}
    })()
  })()
  `;
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
