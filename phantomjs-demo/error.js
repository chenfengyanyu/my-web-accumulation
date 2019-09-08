var page = require('webpage').create();
page.open('https://securelearning.in', function() {
    setTimeout(function() {
    	try {
    		page.render('image.png');
	        phantom.exit();
    	} catch(e) {
    		console.log('Error happened: ' + e.toString());
    		phantom.exit();
    	}
    }, 6000); // Wait 6 secs and take screenshot
});