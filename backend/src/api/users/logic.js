require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');


module.exports = {
  //get all users
  getUsers : () =>{
    return Users.find({})
  },
  //get user by id
  getUser : id => {
    return Users.findById(id)
  },
  //delete user by id
  deleteUser : id => {
    return Users.findByIdAndUpdate(id, {
      $set : {isActive : false}
    })
  },
  //update user by id
  updateUser : req => {
    return Users.findByIdAndUpdate(req.params.USERS_ID, {
      $set: req.body
    })
  },

  //create user
  createUser : req =>{
    return Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: new Date(),
      isActive: req.body.isActive,
      password: req.body.password
    })
  }
}
