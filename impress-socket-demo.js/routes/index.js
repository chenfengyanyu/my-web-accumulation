
/*
 * GET home page.
 */
var jade = require('jade');
var fs = require('fs');

exports.index = function(req, res){
  res.render('index', { title: 'Express1', mode: 'standard'})
};

exports.presi = function(req, res, mode, presi, session) {
    var jadetempl = jade.compile(fs.readFileSync(`./views/presentations/${presi}.jade`, 'utf8'));
    res.render('index', {
      title: presi,
      presi,
      session,
      mode,
      tmpl: jadetempl()
    });
};
