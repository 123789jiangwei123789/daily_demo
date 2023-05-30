//处理url参数为对象
function parseParams(url) {
  let params = /.+\?(.+)/.exec(url)[1]; //取出?号后面的部分
  if (params) {
    let paramsArr = params.split("&"); //分割数组
    let paramsObj = {};
    paramsArr.forEach((param) => {
      if (/=/.test(param)) {
        let [key, val] = param.split("=");
        val = decodeURIComponent(val);
        val = /^\d$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
        if (paramsObj.hasOwnProperty(key)) {
          //若存在相同的key，则融合成数组
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else {
          //若不存在相同的，则直接赋值
          paramsObj[key] = val;
        }
      } else {
        paramsObj[param] = true;
      }
    });
    return paramsObj;
  }
  return "";
}
console.log(
  parseParams("https://juejin.cn/post/6946022649768181774#heading-11?a=1&b=2&c")
);
