const trycatch = () => {
  try {
    undefined.map(v => v);
  } catch(e) {
    console.log(e); // TypeError: Cannot read property 'map' of undefined
  }  
}

trycatch()
