Function.prototype.newApply = function (context, argArr) {
    let newContext = context || globalThis
    let fnName = Symbol('fn');
    newContext[fnName] = this;
    let result;
    if (argArr?.length) {
        result = newContext[fnName]()
    } else {
        result = newContext[fnName](argArr)
    }
    delete newContext[fnName]
    return result
}