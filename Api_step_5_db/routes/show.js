var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/newshow');

var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});
var Todo = mongoose.model('Todo', TodoSchema);
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});
todo.save(function(err){
  if(err)
   console.log(err);
 else
    console.log(todo);
});

Todo.find(function (err, newtable) {
    if (err) return console.error(err);
    console.log('show data '+newtable)
  });

  var callback = function(err,data){
    if(err){return console.error(err);}
    else{console.log('show data 2'+data);}
  }

  Todo.find({completed: true }, callback);
  Todo.find({name: /JS$/ }, callback); 
  var oneYearAgo = new Date();
  oneYearAgo.setYear(oneYearAgo.getFullYear() -1);
  Todo.find({name:/^Master/,completed:false}).where('updated_at').gt(oneYearAgo).exec(callback);
  


  Todo.update({ name: /master/i }, { completed: true }, { multi: true }, callback);
  //Model.findOneAndUpdate([conditions], [update], [options], [callback])
  Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);
  
  module.exports = router;
