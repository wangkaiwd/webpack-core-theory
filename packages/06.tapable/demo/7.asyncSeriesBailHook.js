const { AsyncSeriesBailHook } = require('tapable');

const hook = new AsyncSeriesBailHook();

console.time('time');
// callback or resolve pass parameters will stop execute remain plugins
hook.tapAsync('1', (cb) => {
  setTimeout(() => {
    console.log('1');
    cb(null);
  }, 3000);
});

hook.tapPromise('2', () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('2');
      resolve('2');
    }, 3000);
  });
});

hook.tap('3', () => {
  console.log(3);
  console.timeEnd('time');
});

// hook.callAsync((err) => {
//   console.log('err', err);
// });

hook.promise().then((...args) => {
  console.log('res', args);
});
