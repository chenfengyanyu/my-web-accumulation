function Promise(executor){
  let self = this;
  // 定义 status 状态变量，默认 Promise 处于 pending 状态
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;

  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'fulfulled';
      self.value = value;
      self.onResolvedCallbacks.forEach(function(fn){
        fn();
      })
    }
  }

  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
      self.reason = reason;
      self.onRejectedCallbacks.forEach(function(fn){
        fn();
      })
    }
  }
  // promise 接收一个executor函数，该函数在构造promise实例时就执行
  // executor(resolve,reject);
  try {
    executor(resolve,reject); //捕获的时候发生异常，执行reject
  } catch (error) {
    reject(error)
  }
}

/**
 * 
 * promise实例需要用then方法注册执行成功/失败的回调方法，
 * then中根据promise所处状态，判断调用成功还是失败的回调
 */
Promise.prototype.then = function(onFullfilled, onRejected){
  let self = this;
  if(self.status === 'fulfilled'){
    onFullfilled(self.value);
  }
  if(self.status === 'rejected'){
    onRejected(self.reason);
  }
  if(self.status === 'pending'){
    self.onResolvedCallbacks.push( function(){
        onFulfilled(self.value);
    });
    self.onRejectedCallbacks.push( function(){
        onRejected(self.reason);
    });
  }
}
module.exports = Promise;