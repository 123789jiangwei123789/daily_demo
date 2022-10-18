/**
 * Promise核心四大件
 * resolve(),reject(),then(),catch()
 * Promise状态：promiseStatus(pending,resolved,rejected)
 * Promise结果：promiseResult所传递的值
 * Promise异步保存队列：promiseQueue[]
 */
class MyPromise {
  constructor(excutor) {
    this.promiseStatus = "pending";
    this.promiseResult;
    this.callBackQueue = [];
    /**使用箭头函数锁定this的指向 */
    const resolve = (data) => {
      /**
       * 改变Promise的状态为fulfilled
       * 赋值Promise的值
       * Promise的状态只能修改一次
       */
      if (this.promiseStatus !== "pending") return;
      this.promiseStatus = "fulfilled";
      this.promiseResult = data;
      setTimeout(() => {
        this.callBackQueue.forEach((item) => {
          item.onResolved(data);
        });
      });
    };
    const reject = (data) => {
      /**
       * 改变Promise的状态为rejected
       * 赋值Promise的值
       * Promise的状态只能修改一次
       */
      if (this.promiseStatus !== "pending") return;
      this.promiseStatus = "rejected";
      this.promiseResult = data;
      setTimeout(() => {
        this.callBackQueue.forEach((item) => {
          item.onRejected(data);
        });
      });
    };
    /**
     * 捕获异常错误
     */
    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  /**
   * then方法
   * @param {*function|undefined} onResolved 成功回调
   * @param {*function|undefined} onRejected 失败回调
   * @return {*Promise} 返回的结果
   */
  then(onResolved, onRejected) {
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (reson) => {
        throw reson;
      };
    }
    const _this = this;
    return new MyPromise((resolve, reject) => {
      /**
       * 当前then返回的Promise的状态由回调函数决定
       * 若回调函数return promise，当前then返回的Promise的状态由当前 return promise来决定
       * 若回调函数throw 抛错，当前then返回的Promise的状态则直接置为rejected
       * 若默认无返回值，当前then返回的Promise的状态则直接置为fulfilled
       */
      const dealThen = function (typeFunc) {
        try {
          let result = typeFunc(_this.promiseResult);
          if (result instanceof MyPromise) {
            result.then(
              (v) => {
                resolve(v);
              },
              (e) => {
                reject(e);
              }
            );
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };
      /**判断当前Promise状态是否为 fulfilled */
      if (this.promiseStatus === "fulfilled") {
        setTimeout(() => {
          dealThen(onResolved);
        });
      }
      /**
       * 判断当前Promise状态是否为 fulfilled
       */
      if (this.promiseStatus === "rejected") {
        setTimeout(() => {
          dealThen(onRejected);
        });
      }
      /**
       * 判断当前Promise状态是否为 pending
       * 加入异步执行队列
       */
      if (this.promiseStatus === "pending") {
        this.callBackQueue.push({
          onResolved: function () {
            dealThen(onResolved);
          },
          onRejected: function () {
            dealThen(onRejected);
          },
        });
      }
    });
  }
  /**
   * catch方法
   * @param {*function|undefined} onRejected 失败回调
   * @return {*Promise} 返回的结果
   */
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  /**
   * finally方法
   * @param {*function|undefined} callback 回调
   * @return {*Promise} 返回的结果
   */
  finally(callback) {
    let P = this.constructor;
    return this.then(
      (value) => P.resolve(callback()).then(() => value),
      (reason) =>
        P.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }
  /**
   * 添加resolve方法
   * @param {*any} 传入的值
   * @return {*Promise} 返回的结果
   */
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(
          (r) => {
            resolve(r);
          },
          (e) => {
            reject(e);
          }
        );
      } else {
        resolve(value);
      }
    });
  }
  /**
   * 添加reject方法
   * @param {*any} 传入的值
   * @return {*Promise} 返回的结果
   */
  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }
  /**
   * 添加all方法
   * @param {*Promise[]} 传入的值
   * @return {*Promise} 返回的结果
   * @desccribtion
   * 所有的Promise的状态都变为fulfilled的状态，则返回的Promise的状态才会变成fulfilled的状态，
   * 并且结果为输入数组同样顺序的的数组
   * 否则有一个变为rejected的状态，则返回的Promise的状态就为rejected的状态，
   * 并且结果为当前失败的结果
   */
  static all(promise) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (r) => {
            count++;
            result[i] = r;
            if (count === promise.length) {
              resolve(result);
            }
          },
          (e) => {
            reject(e);
          }
        );
      }
    });
  }
  /**
   * 添加race方法
   * @param {*Promise[]} 传入的值
   * @return {*Promise} 返回的结果
   * @describtion
   * 传入的,Promsie谁的状态先改变，则返回的就是谁的状态
   * 并且返回的Promise的值就是先改变的Promise的值
   */
  static race(promise) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (r) => {
            resolve(r);
          },
          (e) => {
            reject(e);
          }
        );
      }
    });
  }
  /**
   * 添加allSettled
   * @param {*Promise[]} 传入的值
   * @return {*Promise} 返回的结果
   * @describtion
   * 等所有Promise的状态都改变后，则返回的Promise的状态才变成fulfilled,不会变成rejected,
   * 并且返回的结果和传入的顺序一致数组
   * 成功的Promise，对应项包含status为fulfilled，value为Promsie结果
   * 失败的Promise，应项包含status为rejected，reason为Promise结果
   */
  static allSettled(promise) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      let result = [];
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (r) => {
            count++;
            result[i] = {
              status: "fulfilled",
              value: r,
            };
            if (count === promise.length) {
              resolve(result);
            }
          },
          (e) => {
            count++;
            result[i] = {
              status: "rejected",
              reason: e,
            };
            if (count === promise.length) {
              resolve(result);
            }
          }
        );
      }
    });
  }
  /**
   * 添加any
   * @param {*Promise[]} 传入的值
   * @return {*Promise} 返回的结果
   * @describtion
   * 有一个promise的状态，变成fulfilled的状态，则返回的Promise就是fulfilled的状态，
   * 并且结果为成功的值
   * 所有Promise状态都变成rejected的状态，则返回的Promise就是rejected的状态
   * 并且结果是一个 AggregateError 实例。它相当于一个数组
   */
  static any(promise) {
    return new MyPromise((resolve, reject) => {
      let count = 0;
      const result = [];
      console.log(result);
      for (let i = 0; i < promise.length; i++) {
        promise[i].then(
          (r) => {
            resolve(r);
          },
          (e) => {
            count++;
            result[i] = e;
            if (count === promise.length) {
              reject(new AggregateError(result));
            }
          }
        );
      }
    });
  }
}
