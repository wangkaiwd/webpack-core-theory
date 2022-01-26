const { AsyncSeriesHook } = require('tapable');

const hook = new AsyncSeriesHook(['name', 'age']);

console.time('cost');
// hook.tapAsync('1', (name, age, callback) => {
//   setTimeout(() => {
//     console.log('1');
//     callback();
//   }, 1000);
// });
//
// hook.tapAsync('2', (name, age, callback) => {
//   setTimeout(() => {
//     console.log('2');
//     callback();
//   }, 2000);
// });
//
// hook.callAsync('hh', 2, (err) => {
//   console.log('err', err);
// });

hook.tapPromise('1', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('1');
    }, 1000);
  });
});
hook.tapPromise('2', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2');
    }, 2000);
  });
});

hook.promise('hh', 2).then((value) => {
  console.log('value', value);
  console.timeEnd('cost');
});
