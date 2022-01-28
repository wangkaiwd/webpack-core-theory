import github from '../assets/github.jpeg';
import './index.less';

console.log('github', github);
const sum = (a, b) => a + b;
console.log(sum(1, 2));

const image = document.createElement('img');
image.src = github;
image.onload = () => {
  document.body.appendChild(image);
};
