var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/',function(req,res){
    res.send('hi');
})

mongoose.connect('mongodb://localhost/connect');

var TodoSchema = new mongoose.Schema({
  name: String,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

var table = new mongoose.Schema({
    Name : String,
    content : String
})
var tablepost  = mongoose.model('tablepost',table);

var Todo = mongoose.model('connectdb', TodoSchema);

var todo = new Todo({name: 'Master NodeJS',note: 'Getting there...'});
//todo.save(function(err){
 // if(err)
  // console.log(err);
 //else
  //  console.log(todo);
//});

router.get('/find',function(req,res){
    Todo.find(function (err, data) {
        if (err) return res.send(err);
        res.json(data);
      });
})

router.get('/find/:name', function(req,res){
    var n = req.params.name;
    //console.log(n);
    if(n === undefined){
        res.status(404).end()
        console.log(n);
        return n
    } 
    if(typeof n !== 'string') {
        res.status(400).end()
        console.log(n);
        return
    }
    Todo.find({name:n},function(err,data){
        if(err) return res.send(err);
        res.json('find name'+data);
    })
})

router.get('/find/name/:id',function(req,res){
    var id = req.params.id;
    if(typeof id  !== 'string'){
        return   res.status(400).end()
    } 
    Todo.findOne({name:id},function(err,data){
        if(err) return res.send(err)
    })
    .then((data) =>{
   res.json(data);
    })
    }
)


router.get("/new",function(req,res){
    res.sendfile('./views/index.html');
})



router.post('/page',function(req,res){
    var name = req.body.name;
    var content = req.body.content;
    console.log(typeof name);
    var data = 'Name : '+name +'<br/> Content : '+content;
    if(name !== 'string'){
            res.status(400).end()
            return
       // res.sendfile('./views/index.html');
    } else {
    res.send(data);

    }
})

router.post('/add',(req,res)=>{
    const name = req.body.name;
    const content  = req.body.content;
  //if(name !== 'string' || content !== 'string'){
   //    res.status(400).end()
   //    return
  // } else {
    //  console.log(content);
     var table = new tablepost({
         name:name,
         content:content
     })
     table.save(function(err){
         if(err)
         console.log(err);
         else 
         res.json(table);
     })
   
});


  module.exports = router;