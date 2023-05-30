// bind函数
// 实现要点：
// 1、bind函数支持传入this，支持传入参数
// 2、执行bind函数并返回函数，调用的函数this指向bind函数传入的this
// 3、返回的函数也支持传入参数，并且执行函数，bind参数也需要连接一起
Function.prototype.newBind = function (context) {
    let bindArgs = Array.prototype.slice.call(arguments, 1)
    return (...args) => {
        this.call(context, bindArgs.concat([...args]))
    }
}
function func(args) {
    console.log(this.func, args, '11');
}
let obj = {
    func: function (args) {
        console.log(this, args, '22');
    }
}
let func1 = func.newBind(obj, 'bind传参', '22');
func1('返回传参', 'hhh')