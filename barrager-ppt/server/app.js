const express = require('express'),
  bodyParser = require('body-parser'),
  socket = require('socket.io');

const app = express();

const connection  = require('express-myconnection'); 
const mysql = require('mysql');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  connection(mysql,{
      host: 'mysql://mysql:3306/', //'localhost',
      user: 'jartto',
      password : 'hMmx56FN4GHpMXOl',
      port : 3306, //port mysql
      database:'mydb'

  },'pool') //or single

);

const PORT = 4000;
const io = socket(app.listen(PORT, () => console.log(`start on port ${PORT}`)));

io.on('connection', sockets => {
  console.log('连接成功！');
  app.post('/api/send', (req, res, next) => {
    // console.log(req);
    sockets.broadcast.emit('thenews', { message: req.body.msg });
    res.status(200).send('Done');
  })

  sockets.on('my other event', function (data) {
    console.log('back',data);
  });
  
  sockets.on('disconnect', () => {
    console.log('User Disconnected');
  })
});
