//普通对象赋值
// let teacher = { taylor: 26 };
// let otherteacher = teacher;
// otherteacher.taylor = 27
// console.log(otherteacher, teacher);

//手动实现浅拷贝
// 创建新的数据，这个数据有着原始数据属性值的一份精确拷贝

// 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

// 即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址
// 自带浅拷贝
// Object.assign();
// Array.prototype.slice();
// Array.prototype.concat();
// ...扩展运算符
// function shallowCopy(obj) {
//   if (typeof obj != "object" && obj) {
//     return false;
//   }
//   let newObj = obj instanceof Array ? [] : {};
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       newObj[key] = obj[key];
//     }
//   }
//   return newObj;
// }
// let arr = [{ a: 1 }, 1];
// let b = shallowCopy(arr);
// b[0].a = 2;
// console.log(arr);
// console.log(b);


//深拷贝
// JS提供JSON.stringify()，字符串序列化但是这种方式存在弊端，会忽略undefined、symbol和函数
// WeakMap是javascript唯一的弱引用(只接受对象作为键名(null除外)，不接受其它类型的值作为键名)
// 解释：const e1 = document.getElementById('foo')
// const e2 = document.getElementById('bar')
// const arr = [
//     [e1,'foo'],
//     [e2,'bar'],
// ];


function deepClone(obj, hash = new WeakMap()) {
    if (typeof obj != "object" || obj === null) {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    //发现相同引用的对象，则直接返回
    if (hash.get(obj)) {
        return hash.get(obj);
    }
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    let cloneObj = new obj.constructor();
    hash.set(obj, cloneObj);// 为循环引用的对象做标记
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            //   实现递归拷贝;
            cloneObj[key] = deepClone(obj[key], hash);
        }
    }
    return cloneObj;
}



let obj = { a: 1, b: { c: 3 } };
let newObj = deepClone(obj);
newObj.b.c = 4;
console.log(newObj);
console.log(obj);
