require('../../utils/database/connection');
let Items = require('../../utils/database/models/items');
let Users = require('../../utils/database/models/users');

module.exports = {
  resetUserPassword :(id,body) =>{
    let hashedPass = bcrypt.hashSync(body.password, saltRounds)
    return Users.findByIdAndUpdate(id,{password : hashedPass })
  },
  getUsers : () =>{
    return Users.find({ isActive: true })
  },
}