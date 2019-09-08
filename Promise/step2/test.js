let promise = new Promise(function(resolve,reject){
  http.get(url, function(results) {
      resolve(results);
  })
})

promise.then(function(data){
  console.log('data',data);
},function(err){
  console.log('err',err);
})
promise.then(function(data){
  console.log('data',data);
},function(err){
  console.log('err',err);
})
promise.then(function(data){
  console.log('data',data);
},function(err){
  console.log('err',err);
})
