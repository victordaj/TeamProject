require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');
let Items = require('../../utils/database/models/items');
const { findByIdAndDelete } = require('../../utils/database/models/users');
const nodeMailer = require('../../services/mailer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  //get all items
  getItems: () => {
    return Items.find()
  },
  //search by name on items
  searchItems: (name, id) => {
    return Items.find(
      {
        $and: [{ $and: [{ $or: [{ name: name }, { description: name }] }, { userID: id }] }
        ]
      })
  },
  //get all items of an user
  getAllUserItemsPagination: (id, skip, limit) => {
    return Promise.all([Items.find({ userID: id }), Items.find({ userID: id }).skip(parseInt(skip)).limit(parseInt(limit)), Users.findById(id)])
  },
  //create item
  createItem: (body, id) => {
    return Items.create({
      name: body.name,
      description: body.description,
      userID: id
    })
  },
  //update item
  updateItem: (id, body) => {
    return Items.findByIdAndUpdate(id, {
      $set: body
    })
  },
  //delte item
  deleteItem: id => {
    return Items.findByIdAndDelete(id)
  },
  //get one item of an user
  getOneItem: item_id => {
    return Items.findById(item_id)
  },
  //get all users
  getUsers: () => {
    return Users.find({ isActive: true }).select('-password')
  },
  //get user by id
  getUser: id => {
    return Users.findById(id).select('-password')
  },
  //delete user by id
  deleteUser: id => {
    return Users.findByIdAndUpdate(id, {
      $set: { isActive: false }
    })
  },
  //update user by id
  updateUser: (id, body) => {
    let hashedPass = bcrypt.hashSync(body.password, saltRounds)
    return Users.findByIdAndUpdate(id, {
      $set:
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        birthday: body.birthday,
        password: hashedPass
      }
    })
  },

  //create user
  createUser: body => {
    let hashedPass = bcrypt.hashSync(body.password, saltRounds)
    console.log(body.firstName, body.password)
    nodeMailer.sendMail(body.firstName, body.password).catch(console.error)
    return Users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      birthday: body.birthday,
      password: hashedPass
    })
  }
}
