var gify = require('gify');
var fs = require('fs');

var opts = {
  height: 300,
  rate: 10
};

console.time('convert');
gify('input/movie.mp4', 'output/out.gif', opts, function(err){
  if (err) throw err;
  console.timeEnd('convert');
  var s = fs.statSync('output/out.gif');
  console.log('size: %smb', s.size / 1024 / 1024 | 0);
});