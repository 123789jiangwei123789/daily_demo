//函数柯里化：
// 使用多个参数的函数转化为使用一个参数的函数的技术
function add(a, b, c, d) {
    return a + b + c + d
}
function curry(fn) {
    let judge = (...args) => {
        console.log(args, fn.length, arguments);
        //小知识普及function的length,其实就是函数形参的长度，
        //注意当形参有设置默认值的时候，从该位置开始，不算长度及...args都不算
        if (args.length == fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
console.log(add(1, 2, 3, 4));
let addCurry = curry(add)
console.log(addCurry(1)(2)(3)(4));