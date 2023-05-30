//数组去重
function unique(arr) {
  let result = arr.filter(
    (item, index, array) => array.indexOf(item) === index
  );
  //   or
  //   let result = [...new Set(arr)];
  return result;
}
