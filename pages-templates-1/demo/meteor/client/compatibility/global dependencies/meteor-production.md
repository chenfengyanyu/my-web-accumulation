## Important Note about Rickshaw
Due to a "dump uglifier" in `meteor run --production` where all JavaScript and Styles are aggregated and minified, rickshaw breaks due to its requirement to have access to the `$super` variable.
See: https://github.com/meteor/meteor/issues/1360

To run rickshaw in production, it needs to be side-loaded or excluded from meteors uglifier via a hack.
```js
// For example inside a template
	$.getScript("rickshaw.js", function() {
		//callback function
		// run rickshaw graphs
	});
```

Hopefully this problem will be solved in the upcoming meteor version.