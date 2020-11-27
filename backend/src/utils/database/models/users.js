const collection = require('mongoose');

const Users = collection.model('Users',{
    firstName: String,
    lastName: String,
    birthday: Date,
    isActive: {Boolean,default: true} ,
    password: String
})

module.exports = Users 