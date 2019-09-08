const Koa = require('koa');
const compose = require('koa-compose');
const app = new Koa();

const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

// app.use(one);
// app.use(two);
// app.use(three);
// const middlewares = compose([one, two, three]);
const middlewares = compose([one, three, two]);
app.use(middlewares);

app.listen(3000);
