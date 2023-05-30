function typeOf(obj) {
  // 未被覆盖的情况下toString方法返回[object type]，可检测null和date
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
console.log(typeOf(null));
