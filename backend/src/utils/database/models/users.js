const collection = require('mongoose');

const Users = collection.model('Users',{
    firstName: String,
    lastName: String,
    birthday: Date,
    isActive: Boolean,
    password: String
})

module.exports = Users;