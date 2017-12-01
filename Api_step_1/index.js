var  app = require('express')();
var user = require('./user');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));


app.get('/index',function(req,res){
  res.send('hi i am index');
})

app.get('/All',function(req,res){
    res.send( user.findAll())
});

app.get('/id/:id',function(req,res){
    var data ;
    var id = req.params.id
    if(id > 5){
        data = ('not fuond data');
    } else {
 
    data = (user.findById(id));
    }
    res.send(data);
})

app.get('/delete/:id',function(req,res){
    var id = req.params.id
    user.deleteById(id)
    res.send('delete id'+id);
})

app.post('/add',function(req,res){
    var json = req.body;
   res.send("Add new "+json.name)
})

app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


app.listen(5000,function(req,res){
    console.log("listen port 5000");
})

