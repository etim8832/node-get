var express = require('express');
var router = express.Router();
var fs = require('fs');
var filename = './views/file.txt';

router.get('/', function(req, res, next) {

    var option={
   encoding :"utf-8",
   flag:"r"
    }
  fs.readFile(filename,option,function(err,data){
      res.send(data);
  })

});

router.get("/new",function(req,res){
    res.sendfile('./views/index.html');

})

router.post("/new",function(req,res){
    var name = req.body.name;
    var content = req.body.content;
    var data = "Name: "+name+"<br/>Content : "+content+"<br/>";

    fs.appendFile(filename,data,function(err){
        if(err) throw err
        res.redirect("/guestbook");
    })
})

module.exports = router;
