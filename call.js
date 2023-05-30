Function.prototype.newCall = function (context) {
    let newContext = context || globalThis
    let fnName = Symbol('fn')//预防当前对象上存在同名fn
    newContext[fnName] = this
    let args = []
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    let result = newContext[fnName](args)
    delete newContext[fnName];//为了避免当前this对象在调用完成之后一直存在，用完即删
    return result
}
function func1(args) { }
let obj = {
    func2: function (args) {
        console.log(args, this);
    }
}
let obj1 = {}
obj.func2.newCall(obj1)
console.log(obj1, 's');