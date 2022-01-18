window.chunkLoadingGlobal = []; // it is not be used
chunkLoadingGlobal.push = function ([chunkIds, moreModules]) {
  for (const moduleId in moreModules) {
    if (require.o(moreModules, moduleId)) {
      // add new module for modules
      modules[moduleId] = moreModules[moduleId];
    }
  }
  chunkIds.forEach(chunkId => {
    installedChunks[chunkId][0]();
    installedChunks[chunkId] = 0;
  });
};
const installedChunks = {
  main: 0, // have loaded module set 0
};
//
const modules = {};
const caches = {}; // cache module

function require (moduleId) {
  if (caches[moduleId]) {
    return caches[moduleId].exports;
  }
  const module = caches[moduleId] = { exports: {} };
  modules[moduleId](module, module.exports, require);
  return module.exports;
}

require.f = {};
require.p = '';
require.u = (chunkId) => chunkId + '.main.js';
require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
require.r = function (exports) {
  // this code function: typeof exports === 'Module'
  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  Object.defineProperty(exports, '__esModule', { value: true });
};

require.d = function (exports, definitions) {
  for (const key in definitions) {
    if (require.o(definitions, key)) {
      const definition = definitions[key];
      Object.defineProperty(exports, key, {
        get: definition
      });
    }
  }
};
const ensure = require.e = function (chunkId) {
  const promises = [];
  require.f.j(chunkId, promises);
  return Promise.all(promises);
};

require.f.j = (chunkId, promises) => {
  let installedChunkData = undefined;
  const promise = new Promise((resolve, reject) => installedChunkData = installedChunks[chunkId] = [resolve, reject]);
  // installedChunks: { src_video_js: [ resolve, reject, promise ] }
  promises.push(installedChunkData[2] = promise);
  const url = require.p + require.u(chunkId);
  require.l(url);
};
const loadScript = require.l = (chunkId) => {
  const script = document.createElement('script');
  script.src = chunkId + '.main.js';
  document.head.appendChild(script);
  // script.onload = () => { // the moment have executed js code inside new insert script
  //   installedChunks[chunkId][0]();
  //   installedChunks[chunkId] = 0;
  // };
};
const button = document.getElementById('button');
button.addEventListener('click', () => {
  ensure('src_video_js').then(require.bind(require, './src/video.js')).then((result) => {
    console.log('result', result.default);
  });
});
