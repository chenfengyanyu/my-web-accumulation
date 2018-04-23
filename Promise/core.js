function Promise(executor){
  let self = this;
  // 定义 status 状态变量，默认 Promise 处于 pending 状态
  self.status = 'pending';
  self.value = undefined;
  self.reason = undefined;

  function resolve(value){
    if(self.status === 'pending'){
      self.status = 'fulfulled';
      self.value = value;
    }
  }

  function reject(reason){
    if(self.status === 'pending'){
      self.status = 'rejected';
      self.reason = reason;
    }
  }

  executor(resolve,reject);
}

Promise.prototype.then = function(onFullfilled, onRejected){
  let self = this;
  if(self.status === 'fulfilled'){
    onFullfilled(self.value);
  }
  if(self.status === 'rejected'){
    onRejected(self.reason);
  }
}
module.exports = Promise;