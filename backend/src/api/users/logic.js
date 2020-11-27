require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');


let error = err => {
  console.log('err', err)
  res.status(400);
  res.end("eroare")
}

module.exports = {
  //get all users
  getUsers : () =>{
    Users.find({}).then(users =>{
      res.json(users)
    }).catch(err =>{
      return error(err)
    })
  },
  //get user by id
  getUser : () =>{
    Users.findById(req.params.USERS_ID).then(users =>{
      res.json(users)
    }).catch(err =>{
      return error(err)
    })
  },
  //delete user by id
  deleteUser : () =>{
    Users.findByIdAndUpdate(req.params.USERS_ID, {
      $set : {isActive : false}
    }).then(()=>{
      res.end("User succesfully deleted")
    }).catch(err =>{
      return error(err)
    })
  },
  //update user by id
  updateUser :() =>{
    Users.findByIdAndUpdate(req.params.USERS_ID, {
      $set: req.body
    }).then(() => {
      res.end("User succesfullt updated")
    }).catch(err => {
      return error(err)
     })
  },

  //create user
  createUser : () =>{
    Users.create({
      firstName: String,
      lastName: String,
      birthday: Date,
      isActive: {Boolean,default: true} ,
      password: String
    }).then(() => {
      res.end("User succesfully created")
    }).catch(err => {
      return error(err)
    })
  }
}
