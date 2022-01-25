function loader (source) {

}

loader.pitch = function (remainingRequest, precedingRequest, data) {
  console.log('pitch-style-loader', remainingRequest, precedingRequest, data);
  return `
    const style = document.createElement('style');
    style.innerText = require(${JSON.stringify('!!' + remainingRequest)});
    document.head.appendChild(style);
    module.exports = ''
  `;
};
module.exports = loader;
