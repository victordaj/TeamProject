const collection = require('mongoose');


const Users = collection.model('Users',{
    firstName: String,
    lastName: String,
    birthday: Date,
    isActive: { type: Boolean, default: true },
    email: String,
    password: String
})

module.exports = Users;