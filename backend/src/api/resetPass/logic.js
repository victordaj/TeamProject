require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  resetUserPassword: (name, body) => {
    let hashedPass = bcrypt.hashSync(body.password, saltRounds)
    return Users.find({ isActive: true }).then(users =>{
      users.forEach(user =>{
        if(user.firstName === name){
          Users.findByIdAndUpdate(user._id,{password:hashedPass})
        }
      })
    })
  },
  getUsers : () =>{
    return Users.find({ isActive: true })
  },
}