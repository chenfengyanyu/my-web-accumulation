// window.$ = window.jQuery = require('jquery');
// console.log([$, jQuery ]);

var input = document.getElementsByTagName('input')[0],
button = document.getElementsByTagName('button')[0];

button.onclick = function() {
  const clipboard = require('electron').clipboard;
  clipboard.writeText(input.value);
};