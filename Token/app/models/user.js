var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
    name: { type: String, required: true },
    password: {
        type: String,
        validate: [
       function(password){
           return password && password.length >= 6;
                         }
                  ]
               },
    admin:Boolean,
    email:{
        type:String, 
        match:/.+\@.+\.+/
    }
}));

