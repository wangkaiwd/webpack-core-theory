const { SyncWaterfallHook } = require('tapable');

const hook = new SyncWaterfallHook(['name', 'age']);
hook.tap('1', (name, age) => {
  console.log(name, age);
  console.log('tap-1');
  // return something will skip remain sync bail hooks
  return 'error';
});

hook.tap('2', (name, age) => {
  console.log(name, age);
  console.log('tap-2');
});

hook.tap('3', (name, age) => {
  console.log(name, age);
  console.log('tap-2');
});

hook.call('hh', 2);
