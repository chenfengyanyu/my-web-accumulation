// 在渲染进程中.
var desktopCapturer = require('electron').desktopCapturer;

desktopCapturer.getSources({types: ['window', 'screen']}, function(error, sources) {
  console.log('sources', sources);
  if (error) throw error;
  for (var i = 0; i < sources.length; ++i) {
    if (sources[i].name == "Screen 2") {
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, gotStream, getUserMediaError);
      return;
    }
  }
});

function gotStream(stream) {
  console.log(stream, 'stream');
  document.querySelector('video').src = URL.createObjectURL(stream);
}

function getUserMediaError(e) {
  console.log('getUserMediaError');
}