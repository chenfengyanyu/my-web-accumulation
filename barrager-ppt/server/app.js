const express = require('express'),
  bodyParser = require('body-parser'),
  socket = require('socket.io'),
  fs = require('fs');


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
      user: 'root',
      password : '******',
      port : 3306, //port mysql
      database:'mydb'

  },'pool') //or single

);

const PORT = 4000;
const io = socket(app.listen(PORT, () => console.log(`start on port ${PORT}`)));

io.on('connection', sockets => {
  console.log('连接成功！');
  app.post('/api/send', (req, res, next) => {
    // console.log(req.body);
    let info = JSON.stringify(req.body.msg);

    fs.writeFile('./data/user.json', `${info},\n`,
    {flag:'a',encoding:'utf-8',mode:'0666'},function(err){
      if(err) {
        console.log('文件写入失败');
        res.status(500).send('Error');
      } else {
        sockets.broadcast.emit('thenews', { message: req.body.msg });
        res.status(200).send('Done');
      }  
     }) 

    // let info = JSON.parse(JSON.stringify(req.body));
    // req.getConnection(function(err, cnt) {

    //   let data = {
    //     ua: info.ua,
    //     msg: info.msg
    //   }

    //   let query = cnt.add('INSERT INTO (ua, msg)', data, function(err, rows) {
    //     if (err) {
    //       console.log("Error inserting : %s ",err );
    //       return next(err);
    //     }

    //     sockets.broadcast.emit('thenews', { message: req.body.msg });
    //     res.status(200).send('Done');
    //   })
    //   console.log(query.sql);
    // })

  })

  sockets.on('my other event', function (data) {
    console.log('back',data);
  });
  
  sockets.on('disconnect', () => {
    console.log('User Disconnected');
  })
});
