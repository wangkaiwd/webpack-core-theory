const { SyncHook } = require('tapable');

const hook = new SyncHook(['name', 'age']);
hook.tap('1', (name, age) => {
  console.log(name, age);
  console.log('tap-1');
});

hook.tap('1', (name, age) => {
  console.log(name, age);
  console.log('tap-2');
});

hook.call('hh', 2);
