var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/',(req, res) => {
  let form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
    console.log(err,fields, files);
  });
  // console.log(req.body, req.files);
  // var file = req.files.file;
  // console.log(file.name);
  // console.log(file.type);
  
  res.status(200).send('OK');
});
module.exports = router;
