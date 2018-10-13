let Promise = require('./core');

/**
 * promise接收一个executor函数，该函数在构造promise实例时就执行，
 * 所以在Promise构造方法中执行executor,executor需要接收resolve作为执行成功时的回调函数，
 * 接收reject作为执行失败时的回调函数，所以定义了resolve和reject方法
 */
let promise = new Promise(function(resolve,reject){
  /**
   * 调用resolve或reject后，会让promise进入filfilled成功状态或rejected失败状态,
   * 并且只有promise为在pending状态下，才能切换到成功/失败态
   */
  resolve(results);
})

promise.then(function(data){
  console.log(data);
},function(err){
  console.log(err);
})