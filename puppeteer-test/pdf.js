const puppeteer = require('puppeteer');
let { timeout } = require('./tools/tools.js');

(async () => {
  //创建浏览器示例对象
  const browser = await puppeteer.launch({
    executablePath: 'chromium/Chromium.app/Contents/MacOS/Chromium',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--disable-web-security',
    ],
  });
  // 通过浏览器实例 Browser 对象创建页面 Page 对象 
  const page = await browser.newPage();
  // await page.goto('https://baidu.com');
  // await page.goto('http://jartto.wang');
  await page.goto(
    // 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf',
    'https://shensz-t.test.17zuoye.net/printer/pc/#!/class-report?from=paper-manage&group_id=34490&paper_id=3c5d7c7b-5bde-41b6-8cd2-5a7be5ed2c72&session_key=e55e550587061ddd58035207997b402f',
    { waitUntil: ['domcontentloaded','networkidle0']}
  );
  await page.waitFor('*');
  // await timeout(3000);
  await page.pdf({
    path: 'temp/new.pdf',
    format: 'letter',
    printBackground: true
  });
 
  await browser.close();
})().catch(error => console.log('error: ', error.message));