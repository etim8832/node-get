var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:true
}));


router.get('/', function(req, res) {
  res.send('hi i am server');
});

router.post('/save',function(req,res){
    console.log(req.body);
})


module.exports = router;