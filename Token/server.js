var express = require('express');
var app = express();
var apiRoutes = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var config = require('./config');
var User = require('./app/models/user');
var config = require('./config');

mongoose.connect(config.database);
app.set('superSecret', config.secret);

var port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send('Hello The API is at ' + port);
});


app.get('/setup', function (req, res) {
    var nick = new User({
        name: 'Nick Cerminara',
        password: 'password',
        admin: true
    });
    nick.save(function (err) {
        if (err) throw err;

        console.log('User save successfully');
        res.json({ success: true });
    });
});

apiRoutes.post('/data',function(req,res){
    var body = req.body
    var data = new User({
      name: body.name,
      password : body.password,
      admin:body.admin,
      email:body.email
    });
    data.save(function(err){
        if(err) throw err;
        console.log('post save successfully');
        res.json({success:true})
    })
});



apiRoutes.get('/', function (req, res) {
    res.json({ message: ' welcome to the collest api on eartg' })
});


apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    })
});


apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: ' Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, messge: 'authentication failed. Wrong password.' });
            } else {
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'));
                  console.log('show user',user)//---
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                });

            }
        }
    })
})

app.use('/api', apiRoutes);

app.listen(port);
console.log(' magic happens at port' + port);

