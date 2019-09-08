const worker = new Worker('src/worker.js');

worker.onmessage = e => {
  const message = e.data;
  console.log(`[From Worker]: ${message}`);
  document.getElementById('app').innerHTML = message;
};

worker.onerror = function(error) {
  console.log(error);
  worker.terminate();
  // throw error;
};

setTimeout(()=>{
  worker.postMessage('写的真好!');
},3000)


