var express = require('express');
var router = express.Router();
const logic = require('./logic');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.delete('/:USERS_ID', function(req, res, next){
  logic.deleteUser()
});

module.exports = router;
