var express = require('express');
var router = express.Router();
const logic = require('./logic');

let error = err => {
    console.log('err', err)
    res.status(400);
    res.end("eroare")
  }


  //Request to reset password
router.put('/:USERS_NAME', function(req, res, next){
    logic.resetUserPassword(req.params.USERS_NAME,req.body).then(() => {
      res.end("Password succsefully reseted")
    }).catch(err => {
      return error(err)
    })
  });

  //Request to get all the users
router.get('/', function(req, res, next){
    logic.getUsers().then(users => {
      res.json(users);
    }).catch(err => {
      return error(err)
    })
  });

  module.exports = router;