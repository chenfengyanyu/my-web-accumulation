// 循环 ＋ 递归
function flatArray(arr) {
  let result = [];
  arr.forEach(item => {
    if(Array.isArray(item)) {
      result = result.concat(flatArray(item));
    } else {
      result.push(item)
    }
  });
  return result;
}

flatArray([1, 2, 3, 4, [5, 6], 7]);


// 使用 reduce
function flatten(arr){
  return arr.reduce(function(prev, cur){
      return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
  },[])
}

flatten([1, 2, 3, 4, [5, 6], 7]);

// 使用 ES6 扩展符
function flatten(arr){
  while(arr.some(item => Array.isArray(item))){
      arr = [].concat(...arr);
  }
  return arr;
}

flatten([1, 2, 3, 4, [5, 6], 7]);
