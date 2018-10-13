// Using Node v7.9.0+
// https://github.com/amir20/phantomjs-node
const phantom = require('phantom');

(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });


  const status = await page.open('http://shensz-t.test.17zuoye.net/printer/pc/#!/class-report?from=paper-manage&group_id=34548&paper_id=5d4d9dfb-4a7f-49a7-bc20-fd41bad56faa&session_key=ba927753860310643fa421dc8b0fff19');
  // const status = await page.open('http://localhost:5002/printer/pc/#!/class-report?from=paper-manage&group_id=34548&paper_id=5d4d9dfb-4a7f-49a7-bc20-fd41bad56faa&session_key=ba927753860310643fa421dc8b0fff19');

  await page.render('test2.pdf');

  await instance.exit();
})();