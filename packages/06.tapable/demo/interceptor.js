// const { SyncHook } = require('tapable');
const { SyncHook } = require('../lib');

const hook = new SyncHook(['name', 'age']);
hook.intercept({
  call: (name, age) => {
    console.log('name,age', name, age);
    console.log('Starting to call');
  },
  tap (tap) {
    console.log('tap', tap);
  },
  register: (tapInfo) => {
    // tapInfo = { type: "promise", name: "GoogleMapsPlugin", fn: ... }
    console.log(`${tapInfo.name} is doing its job`);
    return tapInfo; // may return a new tapInfo object
  }
});

hook.tap('1', (name, age) => {
  console.log(name, age);
  console.log('tap-1');
});

hook.tap('2', (name, age) => {
  console.log(name, age);
  console.log('tap-2');
});

hook.call('hh', 2);
