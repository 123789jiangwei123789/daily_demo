Array.prototype.newReduce = function (callback, init) {
    if (this == null) {
        throw new TypeError("this is null or not defined")
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function')
    }
    const O = Object(this);//this表示调用函数的执行上下文
    const len = O.length >>> 0;//无符号位右移, 保证转换后的值为正整数 （第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型）
    let k = 0, pre
    if (arguments.length > 1) {
        pre = init
    } else {
        // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
        while (k < len && !(k in O)) {
            // in如果指定的属性在指定的对象或其原型链中，则 in 运算符返回 true。数组的话则下标是否满足
            k++
        }
        if (k >= len) {
            throw new TypeError("Reduce of empty array with no initial value")
        }
        pre = O[k++]
    }
    while (k < len) {
        pre = callback(pre, O[k], k, O)
        k++
    }
    return pre
}
let arr = ['bu', 'ky', 'yi', 'yi']
let newArr = arr.newReduce((pre, item, index) => {
    if (item in pre) {
        pre[item]++
    } else {
        pre[item] = 1
    }
    return pre
}, {})
console.log(newArr, 'newArr');
// 对于reduce的详解
// arr.reduce((prev, cur, index, arr) => { }, init)
// arr: 表示将要原数组
// prev: 表示上一次调用回调时的返回值，或者初始值init
// cur: 表示当前正在处理的数组元素
// index: 表示正在处理的数组元素的索引，若提供init值，则索引为0，否则索引为1
// init: 表示初始值