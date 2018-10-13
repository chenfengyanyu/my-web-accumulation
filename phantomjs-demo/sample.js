var page = require('webpage').create();
page.open('https://www.baidu.com', function(status) {
  setTimeout(function() {
      if ( status === "success" ) {
        page.render('test.png');
        phantom.exit(); 
      } else {
        console.log("Page failed to load."); 
      }
  }, 200);
});