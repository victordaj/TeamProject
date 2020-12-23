var express = require('express');
var router = express.Router();
const logic = require('./logic');
const bcrypt = require('bcrypt');

let error = err => {
  console.log('err', err)
  res.status(400);
  res.end("eroare")
}

//Request to get user credentials
router.post('/', function(req, res, next){
    logic.getUserByCredentials(req.body.firstName).then(user => {
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            console.log(user)
            res.end("Couldn't find user!")
        } else {
            req.session.name = req.body.firstName
            req.session.key = user._id
            res.json(user)
        }
    }).catch(err => {
        return error(err)
    })
})

module.exports = router;