const less = require('less');

function loader (source) {
  let cssStr = '';
  less.render(source, (err, { css }) => {
    console.log('css', css);
    cssStr = css;
  });
  return `module.exports = ${JSON.stringify(cssStr)}`;
}

module.exports = loader;
