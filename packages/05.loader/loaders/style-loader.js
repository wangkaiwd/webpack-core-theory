function loader (source) {
  return `
    const style = document.createElement('style');
    style.innerText = ${JSON.stringify(source)};
    document.head.appendChild(style);
    module.exports = ''
  `;
}
// loader.pitch = function (remainingRequest, precedingRequest, data) {
//   console.log('pitch', remainingRequest, precedingRequest, data);
// };
module.exports = loader;
