/**
 * @msg: 选择排序
 * @param {Array} arr
 * @return: Array
 */
const selectionSort = (arr) => {
  let newArr = [];
  let len = arr.length;
  
  for (let i = 0; i < len; i++) {
    let smallest = arr[0];
    let smallest_index = 0;

    for(let j = 1; j < len - 1; j++) {
      if (arr[j] < smallest) {
        smallest = arr[j];
        smallest_index = j;
      }
    }

    newArr.push(arr.splice(smallest_index,1)[0]);
  }
  return newArr;
}

selectionSort([5, 3, 6, 2, 10]);