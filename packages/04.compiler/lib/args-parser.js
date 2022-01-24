const argsParser = () => {
  // --a 1 --b 2 -> { a:1, b:2 }
  const argv = process.argv.slice(2);
  const array = argv.join(' ').split('--').filter(Boolean);
  return array.reduce((args, item) => {
    const [key, val] = item.split(' ');
    args[key.trim()] = val.trim();
    return args;
  }, {});
};

module.exports = {
  argsParser
};
