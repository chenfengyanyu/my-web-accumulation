
/**
 * Module dependencies.
*/
var http = require('http');
var express = require('express');
var fs = require('fs');
var routes = require('./routes')
var io = require('socket.io');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorhandler = require('errorhandler');

var app = express();

// Configuration
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(methodOverride());
// app.use(app.router);
app.use(express.static(__dirname + '/public'));

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

if (process.env.NODE_ENV === 'production') {
  app.use(errorHandler()); 
}

// This is only meant to be a simple app, running on your local server, with
// one presenation running at one time. So we'll keep that in memory.
var current = {
  presi: null,
  audience: 0
}

// Routes
// Simple Basic Authentication Middleware(http://node-js.ru/3-writing-express-middleware)
function basic_auth (req, res, next) {
  if (req.headers.authorization && req.headers.authorization.search('Basic ') === 0) {
    // fetch login and password
    if (new Buffer(req.headers.authorization.split(' ')[1], 'base64').toString() == 'gaotu:123') {
      next();
      return;
    }
  }
  console.log('Unable to authenticate user');
  console.log(req.headers.authorization);
  res.header('WWW-Authenticate', 'Basic realm="Admin Area"');
  if (req.headers.authorization) {
    setTimeout(function () {
      // res.send('Authentication required', 401);
      res.status(401).send('Authentication required');
    }, 5000);
  } else {
    // res.send('Authentication required', 401);
    res.status(401).send('Authentication required');
  }
}

// Presentation exists middleware 
function presi_exists(req,res,next) {
  console.log('####',req.params);
  fs.exists(__dirname + "/views/presentations/" + req.params.presi + ".jade", function(exists) {
    if (exists) {
      next();
      return;
    } else  {
      // res.send("Presentation Not Found", 404);
      res.status(404).send('Presentation Not Found');
    }
  });
}

//Ad-hoc sessioning
function randomString(length) {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var randomstring = '';
  for (var i=0; i<length; i++) {  
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}
// Presenter
app.get("/host/:presi", basic_auth, presi_exists, function (req,res){ 
  current = {
    presi: req.params.presi,
    audience: 0,
    session: randomString(12),
    current_slide: 0
  }
  routes.presi(req,res,"host", current.presi,current.session);
});
// Audience
app.get("/live/:presi", presi_exists, function (req,res) {
  // Only allow joinin live presentation if started
  if (current.presi != req.params.presi) {
    res.status(404).send('Live presentation no found!');
    // res.send("Live presentation no found!", 404);
  } else {
    routes.presi(req,res,"live", req.params.presi,null);
  }
});

// Regular express.js
app.get("/view/:presi", presi_exists, function (req, res) {
    routes.presi(req,res,"standard", req.params.presi,null);
});


app.get('/', routes.index);

var server = http.createServer(app).listen(3000);
// app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);

// Sockets
var sio=io(server);
sio.sockets.on("connection", function(socket) {
  socket.on('join', function(e) {
    console.log(11111, e)
    if (e.presi == current.presi) {
      socket.join(e.presi);
      if (e.session == current.session) {
        // socket.set('host', true, function() {console.log("HOST IS HERE");});
        socket.on('set host', function (val) { 
          socket.theHost = val; 
          console.log("HOST IS HERE");
        });
      } else {
        current.audience = current.audience + 1;
        // socket.set('host', false, function() {console.log("GUEST ARRIVED: " + current.audience);});

        socket.on('set host', function (val) { 
          socket.theHost = val; 
          console.log("GUEST ARRIVED: " + current.audience);
        });

        socket.emit("slide", {slide:current.current_slide});
      }
    } else {
      socket.emit("disconnect");
    }
  });
  socket.on('slide', function (e) {
    // socket.get("host", function (err, host) {
    //   if (host) {
    //     current.current_slide = e.slide;
    //     sio.sockets.in(current.presi).emit("slide", e);
    //   } else {
    //     socket.emit("disconnect");
    //   }
    // });
    
    sio.sockets.in(current.presi).emit('slide', e);
    current.current_slide = e.slide;
    // socket.on('get host', function(err, host) {
    //   if (socket.theHost) {
    //     current.current_slide = e.slide;
    //     sio.sockets.in(current.presi).emit("slide", e);
    //   } else {
    //     socket.emit("disconnect");
    //   }
    // })
  });
  socket.on("disconnect", function (e) {
    // socket.get("host", function(err,host) {
    //   if (host) {
    //     sio.sockets.in(current.prezi).emit('disconnect');
    //     current.presi = null;
    //   } else {
    //     current.audience = current.audience - 1;
    //     console.log("GUEST LEFT: " + current.audience);
    //   }
    // });

    // socket.on('get host', function(err,host) {
    //   if (socket.theHost) {
    //     sio.sockets.in(current.prezi).emit('disconnect');
    //     current.presi = null;
    //   } else {
    //     current.audience = current.audience - 1;
    //     console.log("GUEST LEFT: " + current.audience);
    //   }
    // });
  });
});




