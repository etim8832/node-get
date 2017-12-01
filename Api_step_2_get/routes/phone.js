var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var brand = req.query.brand;
  var model = req.query.model;
  var version = req.query.version;

  if(brand==null){
    res.sendfile('./views/text.html');
  }else{
   // var data = "brand:"+brand+"<br/>Model:"+model+"<br/>version:"+version;
    var data = setData(brand,model,version); 
   res.send(data);
  }
  });

 

router.get('/:brand/:model/:version',function(req,res){

  var brand = req.params.brand;
  var model = req.params.model;
  var version = req.params.version;
 
   var data = setData(brand,model,version);
   console.log(model)
   console.log(version);
   res.send(data);

})
router.get('**',function(req,res){
  res.sendfile('./views/text.html');
})

function setData(brand,model,version){
  return "brand:"+brand+"<br/>Model:"+model+"<br/>version:"+version
}

module.exports = router;
