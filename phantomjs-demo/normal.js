page.open(address, function (status) {

  if (status !== 'success') {

      // --- Error opening the webpage ---
      console.log('Unable to load the address!');

  } else {

      // --- Keep Looping Until Render Completes ---
      window.setTimeout(function () {
          page.render(output);
          phantom.exit();
      }, 200);
  }
});