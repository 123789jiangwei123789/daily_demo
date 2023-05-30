Object.newAssign = function (target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    let ret = Object(target);
    source.forEach(item => {
        if (item) {
            for (let key in item) {
                ret[key] = item[key];
            }
        }
    })
    return ret;
}