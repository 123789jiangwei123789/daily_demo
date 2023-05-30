//创建一个新对象，使用现有的对象来提供新创建的对象的prototype
Object.newCreate = function (proto, propertyObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null')
    }
    if (propertyObject == null) {
        new TypeError('Cannot convert undefined or null to object')
    }
    //propertyObject参数可以给新创建对象新增或修改对应属性，同object.defineProperties
    function F() { }
    F.prototype = proto
    const newObj = new F();
    if (propertyObject) {
        Object.defineProperties(newObj, propertyObject)
    }
    if (proto === null) {
        newObj.__proto__ = null
    }
    return newObj
}