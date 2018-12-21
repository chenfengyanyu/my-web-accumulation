alert(1)
onmessage = e => {
  const message = e.data;
  console.log(`[From Main]: ${message}`);
  if(message.indexOf('好') > -1) {
    postMessage('谢谢支持');
  }
};