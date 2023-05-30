Array.prototype.newFilter = function (callback, thisArgs) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }
    const O = Object(this);//this表示调用函数的执行上下文
    const len = O.length >>> 0;//无符号位右移, 保证转换后的值为正整数 （第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型）
    let k = 0, res = []
    while (k < len) {
        if (callback.call(thisArgs, O[k], k, O)) {
            res.push(O[k])
        }
        k++
    }
    return res
}
let arr = ['bu', 'ky', 'yi']
let newArr = arr.newFilter((item, index) => {
    return item
})
console.log(newArr, 'newArr');