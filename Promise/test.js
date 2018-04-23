let Promise = require('Mypromise');

let promise = newPromise(function(resolve,reject){
  resolve(results);
})

promise.then(function(data){
  console.log(data);
},function(err){
  console.log(err);
})