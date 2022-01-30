const modules = {
  './src/title': (module, exports, require) => {
    // esModule -> getter
    module.exports = {
      get default () {
        return 'title';
      }
    };
    // common.js -> assign value directly
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
