require('../../utils/database/connection');
let Users = require('../../utils/database/models/users');

module.exports = {
    //get user by credentials
    getUserByCredentials: (firstName) => {
        return Users.findOne({ firstName: firstName, isActive: true })           
    },
}