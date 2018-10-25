const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'chromium/Chromium.app/Contents/MacOS/Chromium',
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('http://jartto.wang');
  await page.screenshot({path: 'temp/blog.png'});
  await browser.close();
})().catch(error => console.log('error: ', error.message));