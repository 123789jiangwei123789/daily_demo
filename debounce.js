//函数防抖
// 支持this和event
// 立即执行
// 函数返回值
// 支持取消功能
function debounce(func, wait, immediate) {
  let timer, result;
  let debounced = function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      let callNow = !timer;// 如果已经执行过，不再执行
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) {
        result = func.apply(context, args)
      }
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }
  return debounced
}
