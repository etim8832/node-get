var express = require('express');
var app = express();


app.get('/',function(req,res){
    res.send('hi i am server');
})

app.get('/show',function(req,res){
    res.sendfine('./views/index.html');
})

app.listen(3000,function(){
    console.log('running at 3000');
})