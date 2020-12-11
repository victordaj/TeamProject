require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');
let Items = require('../../utils/database/models/items');
const { findByIdAndDelete } = require('../../utils/database/models/users');

module.exports = {
  //get all items
  getItems : () =>{
    return Items.find()
  },
  //search by name on items
  searchItems : (name,id) =>{
    let regex = new RegExp(name,'i');
    return Items.find(
     {$and :[ { $and: [ { $or: [{name : regex },{description: regex}] },{userID : id}]}
      ]})
  },
  //get items of an user
  getUserItems : id =>{
    return Items.find({userID : id})
  },
  //create item
  createItem : (body,id) =>{
    return Items.create({
      name : body.name,
      description : body.description,
      userID : id
    })
  },
  //update item
  updateItem : (id,body) => {
    return Items.findByIdAndUpdate(id, {
      $set: body
    })
  },
  //delte item
  deleteItem : id =>{
    return Items.findByIdAndDelete(id)
  },
  //get one item of an user
  getOneItem : item_id =>{
    return Items.findById(item_id)
  },
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
    return Users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      password: body.password
    })
  }
}
