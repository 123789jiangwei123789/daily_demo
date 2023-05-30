//函数节流（事件在持续触发过程中，间隔wait执行）
//时间戳版本，立即执行
// function throttle(func, wait) {
//     let previous = 0, context;
//     return function () {
//         context = this;
//         let args = arguments;
//         let now = Number(new Date());
//         if (now - previous > wait) {
//             func.apply(context, args)
//             previous = now
//         }
//     }
// }
//定时器版本，停止触发后，依然会执行一次
// function throttle(func, wait) {
//     let timeOut
//     return function () {
//         let context = this;
//         let args = arguments
//         if (!timeOut) {
//             timeOut = setTimeout(() => {
//                 timeOut = null
//                 func.apply(context, args)
//             }, wait)
//         }
//     }
// }
//合并版本支持立即执行，也支持停止触发
/**
 * @param {*Function} func 
 * @param {*Number} wait 
 * @param {*Object} options 配置项含leading: 是否立即执行 trailing：是否触发结束后执行
 * 注意：leading和trailing不能同时为false
 */
function throttle(func, wait, options) {
    let previous = 0, timeOut, context, args;
    if (!options) options = {};
    //触发后执行
    let later = function () {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeOut = null
        func.apply(context, args)
        if (!timeOut) context = args = null
    }
    //执行回调
    let throttled = function () {
        let now = new Date().getTime();
        if (!previous && options.leading === false) previous = now
        let remaining = wait - (now - previous)
        context = this
        args = arguments
        //剩余时间不足，时间戳版本即为立即执行
        if (remaining <= 0 || remaining > wait) {
            if (timeOut) {
                clearTimeout(timeOut)
            }
            previous = now
            func.apply(context, args)
            if (!timeOut) context = args = null
        } else if (!timeOut && options.trailing !== false) {
            timeOut = setTimeout(later, remaining)
        }
    }
    //取消节流
    throttled.cancel = function () {
        clearTimeout(timeOut)
        previous = 0
        timeOut = null
    }
    return throttled
}