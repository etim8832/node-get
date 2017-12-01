var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema(({
 email : String,
 firstName : String , 
 lastName : String,
 passwordHash : String,
 passwordSalt : String

}));

module.exports = mongoose.model('user',user);