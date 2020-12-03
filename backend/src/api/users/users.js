var express = require('express');
var router = express.Router();
const logic = require('./logic');

let error = err => {
  console.log('err', err)
  res.status(400);
  res.end("eroare")
}

router.post('/', function(req, res, next){
  logic.createUser(req.body).then(() => {
    res.end("User succesfully created")
  }).catch(err => {
    return error(err)
  })
});

router.get('/', function(req, res, next){
  logic.getUsers().then(users => {
    res.json(users);
  }).catch(err => {
    return error(err)
  })
});

router.get('/:USERS_ID', function(req, res, next){
  logic.getUser(req.params.USERS_ID).then(user => {
    res.json(user)
  }).catch(err => {
    return error(err)
  })
});

router.put('/users/:USERS_ID', function(req, res, next){
  logic.updateUser(req.params.USERS_ID,req.body).then(() => {
    res.end("User succesfully updated")
  }).catch(err => {
    return error(err)
  })
});

router.delete('/:USERS_ID', function(req, res, next){
  logic.deleteUser(req.params.USERS_ID).then(() => {
    res.end("User succesfully deleted")
  }).catch(err => {
    return error(err)
  })
});

module.exports = router;
