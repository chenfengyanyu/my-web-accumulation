import koaRouter from 'koa-router';
import fs from 'fs';
const router = koaRouter();

// index
router.get('/', async (ctx, next) => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
});

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./src/pages/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {
  let view = '404.html'
  switch ( url ) {
    case '/':
      view = 'index.js'
      break
    case '/temp':
      view = '/temp/index.js'
      break
    case '/info':
      view = '/info/index.js'
      break
    case '/404':
      view = '404.html'
      break
    default:
      break
  }
  let html = await render(view);
  return html;
}

export default router;