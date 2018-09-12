var page = require('webpage').create();
page.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36';

page.open('https://securelearning.in', function() {
  page.render('image.png');
  phantom.exit();
});

