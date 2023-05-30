function newFunction(params) {
    var obj = new Object();
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;//重新指定原型(person)
    var ret = Constructor.apply(obj, arguments);
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof ret === 'object' ? ret || obj : obj;
}
function person(name, age) {
    this.name = name;
    this.age = age;
};
let p = newFunction(person, '布兰', 12);
console.log(p)  // { name: '布兰', age: 12 }
