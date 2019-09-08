const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  console.log('ctx:',ctx);
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
