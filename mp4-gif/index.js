var fs = require('fs');
var gifify = require('gifify');
var path = require('path');

var input = path.join(__dirname, '/input/movie.mp4');
var output = path.join(__dirname, '/output/movie.gif');

var gif = fs.createWriteStream(output);

var options = {
  resize: '500:-1',
  from: 30,
  to: 35,
  subtitles: path.join(__dirname, 'movie.ass')
};

try {
  gifify(input, options).pipe(gif);
} catch(e) {
  console.log('error:', e);
}


gif.on('close', function end() {
  console.log('gifified ' + input + ' to ' + output);
});