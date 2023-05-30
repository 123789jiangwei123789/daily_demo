//转JSON字符串
//有如下功能（后面2个可选参数不做写入）
//1、若传入被序列参数为基本数据类型
// (1)若为undifined, 转换后则还是为undifined
// (2)若为null, ...变成'null'
// (3)若为symbol, ...变成undefined
// (4)若为NaN或者infinity, ...变成'null'
// (5)若为boolean, ...变成'false'或'true'
// (6)若为number, ...变成字符串，
// (7)若为string, ...则还是字符串
// 2、若传入被序列参数为函数类型
// 则转换过后，是undefined
// 3、若传入被序列的参数为对象类型（非函数类型）
// (1)若为数组，值为symbol, undefined, 函数，则转换为'null'
// (2)若为Date对象，则返回toJSON的字符串
// (3)若为RegExp对象，则返回'{}'字符串
// (4)若为普通对象
//  如果属性值当中有undefied, symbol, 函数，则忽略，删除
//  另外以symbol为属性的，也会被忽略
//  有toJSON方法，则序列化后toJSON的值
// 5、若传入被序列参数包含循环引用的对象（对象相互间引用，形成无限循环），要抛错
function JSONStringify(data) {
    let dataType = typeof data;
    if (dataType !== 'object') {
        let result = data;
        //data 可能是 string/number/null/undefined/boolean
        if (Number.isNaN(data) || data === Infinity) {
            //NaN 和 Infinity 序列化返回 "null"
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            //function 、undefined 、symbol 序列化返回 undefined
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        //boolean 返回 String()
        return String(result);
    } else if (data instanceof Array) {
        let result = [];
        //如果是数组
        //toJSON 方法可以存在于原型链中
        data.forEach((item, index) => {
            if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
                result[index] = "null";
            } else {
                result[index] = JSONStringify(item);
            }
        });
        result = "[" + result + "]";
        return result.replace(/'/g, '"');

    } else {
        //普通对象
        /**
         * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
         * symbol key 忽略
         * undefined、函数、symbol 为属性值，被忽略
         */
        let result = [];
        Object.keys(data).forEach((item, index) => {
            if (typeof item !== 'symbol') {
                //key 如果是symbol对象，忽略
                if (data[item] !== undefined && typeof data[item] !== 'function'
                    && typeof data[item] !== 'symbol') {
                    //键值如果是 undefined、函数、symbol 为属性值，忽略
                    result.push('"' + item + '"' + ":" + JSONStringify(data[item]));
                }
            }
        });
        return ("{" + result + "}").replace(/'/g, '"');
    }
}
console.log(JSONStringify({ a: 1 }));