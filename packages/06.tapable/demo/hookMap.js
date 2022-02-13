const { SyncHook, HookMap } = require('tapable');
const keyedHook = new HookMap(key => new SyncHook(['arg']));
keyedHook.for('key1').tap('MyPlugin', (arg) => {
  console.log('key1', arg);
});

keyedHook.for('key2').tap('MyPlugin', (arg) => {
  console.log('key2', arg);
});

const hook = keyedHook.get('key1');
if (hook !== undefined) {
  hook.call('hh');
}

// this.map = {}
// for(key) {
//   this.map.set(key,factory(key))
//   return factory(key)
// }
// get(key) {
//  this.map.get(key).tap()
// }
//
// this.map.set('')
