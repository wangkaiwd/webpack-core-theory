const less = require('less');

function loader (source) {
  const callback = this.async();
  less.render(source).then(({ css, map, imports }) => {
    console.log('css', css);
    callback(null, css, map, imports);
  }).catch((err) => {
    callback(err);
  });
}

module.exports = loader;
