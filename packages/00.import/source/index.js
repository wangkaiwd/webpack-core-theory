const modules = {
  './src/title': (module, exports, require) => {
    // Object.defineProperty
    module.exports.default = 'title';
  }
};
const cache = {}; // avoid circular import and repeat import

const _require = (moduleId) => {
  if (cache[moduleId]) {
    return cache[moduleId].exports;
  }
  const module = cache[moduleId] = {
    exports: {}
  };
  modules[moduleId](module, module.exports, _require);
  return module.exports;
};

const title = _require('./src/title');
console.log('title', title.default);
