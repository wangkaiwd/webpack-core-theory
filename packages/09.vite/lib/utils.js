const path = require('path');
const Stream = require('stream');
const resolve = (base = 'node_modules') => (dir) => path.resolve(process.cwd(), base, dir);
const innerNodeModules = resolve();
const parentNodeModules = resolve('../../node_modules');
const resolveVue = () => {
  const compilerPkgPath = innerNodeModules('@vue/compiler-sfc/package.json');
  const compilerPkg = require(compilerPkgPath);
  const compilerPath = path.resolve(path.dirname(compilerPkgPath), compilerPkg.main);
  const runtimeDOM = parentNodeModules('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js');
  const runtimeCore = parentNodeModules('@vue/runtime-core/dist/runtime-core.esm-bundler.js');
  const reactivity = parentNodeModules('@vue/reactivity/dist/reactivity.esm-bundler.js');
  const shared = parentNodeModules('@vue/shared/dist/shared.esm-bundler.js');
  const vue = parentNodeModules('vue/dist/vue.runtime.esm-bundler.js');
  return {
    compiler: compilerPath,
    vue,
    '@vue/runtime-dom': runtimeDOM,
    '@vue/runtime-core': runtimeCore,
    '@vue/reactivity': reactivity,
    '@vue/shared': shared
  };
};

function readBody (stream) {
  if (stream instanceof Stream) {
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('data', (chunk) => {
        buffers.push(chunk);
      });
      stream.on('end', () => {
        resolve(Buffer.concat(buffers).toString());
      });
    });
  } else {
    return stream.toString();
  }
}

function isBrowserSupportPath (url) {
  return url.startsWith('/') || url.startsWith('.');
}

exports.resolveVue = resolveVue;
exports.readBody = readBody;
exports.isBrowserSupportPath = isBrowserSupportPath;
