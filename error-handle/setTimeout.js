try {
  setTimeout(() => {
    undefined.map(v => v);
  }, 1000)
} catch(e) {
  console.log(e); // Uncaught TypeError: Cannot read property 'map' of undefined
}
