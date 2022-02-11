const { AsyncSeriesWaterfallHook } = require('tapable');

const hook = new AsyncSeriesWaterfallHook(['name']);

console.time('time');
// callback or resolve pass parameters will become next plugin callback parameter
hook.tapAsync('1', (name, cb) => {
  console.log('name', name);
  setTimeout(() => {
    console.log('1');
    cb(null, '1');
  }, 3000);
});

hook.tapPromise('2', (arg) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2', arg);
      resolve('2');
    }, 3000);
  });
});

hook.tap('3', (arg) => {
  console.log('3', arg);
  console.timeEnd('time');
  return arg;
});

hook.callAsync('start', (err) => {
  console.log('err', err);
});

// hook.promise('start').then((...args) => {
//   console.log('res', args);
// });
