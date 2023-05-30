const EventBus = {
  cache: {},
  on(eventKey, callback) {
    if (this.cache[eventKey]) {
      this.cache[eventKey].push(callback);
    } else {
      this.cache[eventKey] = [callback];
    }
  },
  off(eventKey, callback) {
    if (this.cache[eventKey]) {
      let isExist = callback ? this.cache[eventKey].indexOf(callback) : -1;
      if (isExist > -1) {
        this.cache[eventKey].splice(isExist, 1);
      } else {
        delete this.cache[eventKey];
      }
    }
  },
  emit(eventKey, once = false, ...args) {
    if (this.cache[eventKey]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[eventKey].slice();
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.cache[eventKey];
      }
    }
  },
};
function fn1(name) {
  console.log(name);
}
function fn2(name) {
  console.log(name + "2");
}
EventBus.on("event", fn1);
EventBus.on("event", fn2);
EventBus.emit("event", "你是傻逼");
EventBus.off("event");
EventBus.emit("event", "你是傻逼");
EventBus.off("event", fn2);
EventBus.emit("event", "你是傻逼");
