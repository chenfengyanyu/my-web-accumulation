import Koa from 'koa';
import compose from 'koa-compose';
import koaRouter from 'koa-router';
import cors from '@koa/cors';
import logger from 'koa-logger';
// import api from './routes/api';
import book from './routes/book';
import history from './routes/history';
import config from './config';
import error from './middlewares/error_handler';

// console.log(config,'config');

const app = new Koa();
app.use(cors({
  origin: '*',
  allowMethods: 'GET,POST',
}));

const router = koaRouter();

router.all('/ping', async (ctx) => {
  ctx.status = 200;
  ctx.body = {
      result: 'success',
      target: 'student_middle',
      message: 'I\'m fine, thank you!'
  };
});

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

// router.get('/', async (ctx,next) => {
//   ctx.response.body = 'Hello World';
// })

// router.use(page.routes());
// router.use('/api', api.routes());
router.use('/api', book.routes());
router.use('/api', history.routes());


const middlewares = compose([error(), logger(), router.routes()]);
app.use(middlewares);

app.listen(config.port);
console.log(`[${process.env.NODE_ENV}] starting at port ${config.port}`);