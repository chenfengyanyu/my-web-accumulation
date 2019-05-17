var impressiv = function(presi) {
  var socket = io.connect("http://172.24.61.67:3000");
  socket.on('connect', function(data) {
    socket.emit('join', {presi: presi});
  });
  socket.on('slide', function(data) {
    // console.log('Acknowledge!!!!!',data);
    impress().goto(data.slide);
  });
  socket.on('disconnect', function(data) {
    alert('演示结束，欢迎观看！');
    // io.disconnect();
  });
  // Unbind controls. Would be nice if controls were optional in impress.js
  // Comments in doc seems like it is coming.
  $(document).unbind('touchstart');
  $(document).unbind('click');
  $(document).unbind('keydown');
  $(document).unbind('keyup');
}
