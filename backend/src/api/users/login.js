var express = require('express');
var router = express.Router();
const logic = require('./logic');

let error = err => {
  console.log('err', err)
  res.status(400);
  res.end("eroare")
}

//Request to get user credentials
router.post('/', function(req, res, next){
    logic.getUserByCredentials(req.body.firstName).then(user => {
        if(!user) {
            res.end("Couldn't find user")
        } else if (req.body.password !== user.password) {
            res.end("Passwords did not match")
        } else {
            res.json(user)
        }
    }).catch(err => {
        return error(err)
    })
})

module.exports = router;