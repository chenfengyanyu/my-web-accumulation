const devices = require('puppeteer/DeviceDescriptors');
const puppeteer = require('puppeteer');

(async () => {
  //创建浏览器示例对象
  const browser = await puppeteer.launch({
    executablePath: 'chromium/Chromium.app/Contents/MacOS/Chromium',
    headless: true
  });
  // 通过浏览器实例 Browser 对象创建页面 Page 对象 
  const page = await browser.newPage();
  await page.emulate(devices['iPhone X']);
  await page.goto('http://jartto.wang');

  await page.screenshot({path: 'temp/iphonex.png'});
 
  await browser.close();
})().catch(error => console.log('error: ', error.message));