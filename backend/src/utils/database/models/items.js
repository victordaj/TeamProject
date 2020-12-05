const collection = require('mongoose');

const Items = collection.model('Items',{
    name: String,
    description: String,
    userID: String
})

module.exports = Items;