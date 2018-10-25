var express = require('express');
var router = express.Router();

var User = require('../db/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  	User.findOne({_id:req.query.id},function(err,data){
		if (err) {
		    console.log(err);
		  } else {
		  	// console.log(data);
		    res.render('users', { args : data});
		  }
	})
});

router.get('/name', function(req, res, next) {
  res.send('hello jartto!');
});

module.exports = router;
