const button = document.getElementById('button');
// import() file by click event
button.addEventListener('click', () => {
  import('./video').then((result) => {
    console.log(result.default);
  });
});
