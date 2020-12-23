require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');
const { findByIdAndDelete } = require('../../utils/database/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  //get all users
  getUsers : () =>{
    return Users.find({ isActive: true })
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
  updateUser : (id,body) => {
    return Users.findByIdAndUpdate(id, {
      $set: body
    })
  },

  //create user
  createUser : body =>{
    let hashedPass = bcrypt.hashSync(body.password, saltRounds)
    return Users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      password: hashedPass
    })
  }
}
