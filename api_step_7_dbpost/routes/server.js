var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/demo');

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get('/show', (req, res) => {
    res.sendfile('./views/index.html')
});

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String
});

var user = mongoose.model("user", schema);


app.post('/add', (req, res) => {
    var mydata = new user(req.body);
    console.log(mydata.firstName);
    console.log(mydata.lastName)
    mydata.save()
        .then(item => {
            console.log(item)
            res.json(item.firstName);
        })

        .catch(err => {
            res.status(400).send('unable tosave to database');
        })
})

app.get('/page', (req, res) => {
    var mydata = new user(req.body);
    console.log('page 1');
    mydata.find({ firstName: etim }, function (err, data) {
        if(err) return res.send(err)
    })
        .then((data) => {
            console.log('page : '+ data)
            res.json(data);
        })
})


module.exports = app;