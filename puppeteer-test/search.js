const devices = require('puppeteer/DeviceDescriptors')
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'chromium/Chromium.app/Contents/MacOS/Chromium',
    headless: true
  });
  const page = await browser.newPage();
  await page.emulate(devices['iPhone X']);
  await page.goto('https://www.baidu.com/');

  // 输入框 id，搜索关键字 jartto
  await page.type('#index-kw', 'jartto');
  // 模拟点击提交按钮
  await page.click('#index-bn');
  // 跳转等待时间
  await page.waitForNavigation({ timeout: 3000 });

  await page.screenshot({path: 'temp/search.png'});
  await browser.close();
})().catch(error => console.log('error: ', error.message));