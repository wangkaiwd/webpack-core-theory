class HookCodeFactory {
  setup (instance, options) {
    instance._x = options.taps.map(tap => tap.fn);
  }

  init (options) {
    this.options = options;
  }

  deinit () {
    this.options = null;
  }

  callTapSeries () {
    const { taps } = this.options;
    if (taps.length === 0) {
      return '';
    }
    let code = '';
    for (let i = 0; i < taps.length; i++) {
      code += this.callTap(i);
    }
    return code;
  }

  callTapParallel ({ onDone }) {
    const { taps } = this.options;
    let code = `let _counter = ${taps.length}\n`;
    code += `
      const _done = () => {
        ${onDone}
      }
    `;
    for (let i = 0; i < taps.length; i++) {
      code += this.callTap(i);
    }
    return code;
  }

  callTap (i) {
    const { taps } = this.options;
    const { type } = taps[i];
    let code = '';
    switch (type) {
      case 'sync':
        code += `
          const _fn${i} = _x[${i}]
          _fn${i}(${this.args()})
        `;
        break;
      case 'async':
        code += `
          const _fn${i} = _x[${i}]
          _fn${i}(${this.args({
          after: ` 
            () => {
              if(--_counter === 0) {
                _done()
              }
            }
            `
        })})
        `;
        break;
      case 'promise':
        code += `
          const _fn${i} = _x[${i}]
          const _promise${i} = _fn${i}(${this.args()})
          _promise${i}.then(() => {
            if(--_counter === 0) {
              _done()
            }
          })
        `;
        break;
      default:
        break;
    }

    return code;
  }

  create (options) {
    this.init(options);
    let fn;
    switch (options.type) {
      case 'sync':
        fn = new Function(this.args(), this.header() + this.content());
        break;
      case 'async':
        fn = new Function(this.args({ after: '_callback' }), this.header() + this.content({ onDone: '_callback()' }));
        break;
      default:
      case 'promise':
        const content = this.content({ onDone: '_resolve()' });
        const promiseContent = `
          return new Promise((_resolve,_reject) => {
            ${content}
          })
        `;
        fn = new Function(this.args(), this.header() + promiseContent);
        break;
    }
    this.deinit();
    return fn;
  }

  args ({ before, after } = {}) {
    let { args } = this.options;
    if (before) {
      args = [before, ...args];
    }
    if (after) {
      args = [...args, after];
    }
    if (args && args.length > 0) {
      return args.join(',');
    }
    return undefined;
  }

  header () {
    // this -> SyncHook instance
    return `const _x = this._x\n`;
  }

  content () {
    throw new Error('Abstract: should be overridden');
  }
}

module.exports = HookCodeFactory;
