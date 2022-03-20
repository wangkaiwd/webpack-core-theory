const render = () => {
  const title = require('./title');
  const root = document.querySelector('#root');
  root.innerText = title;
};

render();

if (module.hot) {
  module.hot.accept(['./title.js'], render);
}
