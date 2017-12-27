var express = require('express');
// var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

var User = require('../db/db');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
	var temp = {
		updateFlag : false,
		name : '',
		phone : '',
		id : ''
	} 
	if(req.query.id)  {
		User.findOne({_id:req.query.id},function(err,datas){
			if (err) {
			    console.log(err);
			  } else {
			    temp.name = datas.name;
			    temp.phone = datas.phone;
			    temp.updateFlag = true;
			    temp = {
					updateFlag : true,
					name : datas.name,
					phone : datas.phone,
					id : datas._id
				} 
			    console.log(datas);
			    res.render('index',{
			    	args : [datas],
			    	temp: temp
			    });
			  }
		})
	}else{
		User.find({},function(err,datas){
			 if (err) {
			    console.log(err);
			  } else {
			    res.render('index', { 
			    	args : datas,
			    	temp : temp
			    });
			  }
		})
	}
});

router.post('/add', urlencodedParser , function(req, res, next) {
	var theOne = new User({
		name:req.body.name,
		phone:req.body.phone
	});
	if(req.body.uid){
		User.update({_id: req.body.uid},{$set: {name: req.body.name,phone: req.body.phone}},function (err, rst) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log('update success! %j', rst);
		    res.redirect('/');
		  }
		});
	}else{
		theOne.save(function (err) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log('add success!');
		    res.redirect('/');
		  }
		});
	}
});

router.get('/delete', function(req, res, next) {
	User.remove({_id:req.query.id},function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('delete success!');
	    res.redirect('/');
	  }
	});
});

router.get('/add', urlencodedParser , function(req, res, next) {
	console.log(req.query.id);
	// res.send(updateFlag);
	// res.render('index',{updateFlag:true});
	// updateFlag = true;
	res.redirect('/?id='+req.query.id);
});


module.exports = router;
