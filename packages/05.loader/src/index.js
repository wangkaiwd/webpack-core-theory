import github from '../assets/github.jpeg';

console.log('github', github);
const sum = (a, b) => a + b;
console.log(sum(1, 2));

const image = document.createElement('img');
image.src = github;
image.onload = () => {
  document.body.appendChild(image);
};
