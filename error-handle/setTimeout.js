try {
  setTimeout(() => {
    undefined.map(v => v);
  }, 1000)
} catch(e) {
  console.log(e); // TypeError: Cannot read property 'map' of undefined
}
