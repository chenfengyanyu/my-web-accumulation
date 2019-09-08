const puppeteer = require('puppeteer');


puppeteer.launch({
  executablePath: 'chromium/Chromium.app/Contents/MacOS/Chromium',
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(function (browser) {
  browser.newPage().then(function (page) {

    page.goto('http://shensz-t.test.17zuoye.net/printer/pc/#!/class-report?from=paper-manage&group_id=34490&paper_id=3c5d7c7b-5bde-41b6-8cd2-5a7be5ed2c72&session_key=e55e550587061ddd58035207997b402f', { waitUntil: ['domcontentloaded', 'networkidle0', 'load'] }).then(function (response) {
      page.pdf({
        path: 'temp/pdf2.pdf',
        format: 'letter',
        printBackground: true
      })
      .then(function (res) {
        browser.close();
      }).catch(function (e) {
        browser.close();
      })
    })
  })
}).catch(error => console.log('error: ', error.message));