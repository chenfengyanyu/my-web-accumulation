function stringCount(str) {
  let flag = new Set(str.split(''));
  let arr = str.split('');
  let obj = {
    count: 0,
    val: ''
  }

  flag.forEach(item => {
    let len = arr.filter((val, index, array) => {
      return val === item;
    }).length;

    if (len > obj.count) {
      obj = {
        count: len,
        val: item
      }
    }
  })

  return `出现最多的字符是：${obj.val}，共出现 ${obj.count} 次`;
  
}

stringCount('jartto, helloo worldd!'); // 出现最多的字符是：o，共出现 4 次
stringCount('aabbbc'); // "出现最多的字符是：b，共出现 3 次"