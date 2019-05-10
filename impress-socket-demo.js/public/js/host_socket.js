var impressiv = function(presi,session) {
  var socket = io.connect("http://172.24.61.131:3000");
  socket.on('connect', function(data) {
    socket.emit('join', {presi: presi, session:session});
  });
  socket.on('disconnect', function(data) {
    alert('演示结束，欢迎观看！');
  });

  document.addEventListener("impress:stepgoto", function(event) {
    socket.emit("slide", {slide:event.target.id});
  });
}

