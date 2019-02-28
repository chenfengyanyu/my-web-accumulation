function primeNumber(m, n) {
  let sum = 0;
  let arr = [];
  for(let i = m; i < n; i++) {
    sum = 0;
    for(let j = 0; j < 100; j++) {
      if (i % j == 0) {
        sum++;
      }
    }
    if(sum == 2) {
      arr.push(i);
    }
  }
  return arr;
}
primeNumber(1, 50);