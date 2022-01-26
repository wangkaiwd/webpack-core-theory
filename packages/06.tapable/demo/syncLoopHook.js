const { SyncLoopHook } = require('tapable');

// return value is non-undefined will restart from the first hook

let counter1 = 0, counter2 = 0, counter3 = 0;

const hook = new SyncLoopHook();

hook.tap('1', () => {
  console.log('1', counter1);
  if (++counter1 === 1) {
    counter1 = 0;
    return;
  }
  return true;
});

hook.tap('2', () => {
  console.log('2', counter2);
  if (++counter2 === 2) {
    counter2 = 0;
    return;
  }
  return true;
});


hook.tap('3', () => {
  console.log('3', counter3);
  if (++counter3 === 3) {
    counter3 = 0;
    return;
  }
  return true;
});

hook.call()
