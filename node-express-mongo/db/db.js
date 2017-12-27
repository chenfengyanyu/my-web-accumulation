var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name : String,
	phone : String
},{ strict: false })

var User = mongoose.model('User', userSchema);

module.exports = User;
