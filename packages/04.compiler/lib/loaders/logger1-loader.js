function logger1Loader (source) {
  console.log('logger1');
  return source + '//logger1';
}

module.exports = logger1Loader;
