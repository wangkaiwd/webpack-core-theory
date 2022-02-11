const { AsyncParallelHook } = require('tapable');

const hook = new AsyncParallelHook(['name', 'age']);

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
    });
  });
});
hook.tapPromise('2', (name, age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('2');
    });
  });
});

hook.promise('hh', 2).then((value) => {
  console.log('value', value);
});
