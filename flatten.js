//数组扁平化
function flatten(arr, level) {
  function deal(arr, currentLevel) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && currentLevel >= 0) {
        result = result.concat(deal(arr[i], currentLevel - 1));
      } else {
        result.push(arr[i]);
      }
    }
    return result;
  }
  return deal(arr, level - 1)
  // or
  // while (arr.some((item) => Array.isArray(item))) {
  //   arr = [].concat(...arr);
  // }
  // return arr;
}
console.log(flatten([1, 2, [3, 4, [6, 7, [11, 12]]], [5, 6, [3, 3]], [1, 2, [2, 3]]], 2));
console.log([1, 2, [3, 4, [6, 7, [11, 12]]], [5, 6, [3, 3]], [1, 2, [2, 3]]].flat(2));