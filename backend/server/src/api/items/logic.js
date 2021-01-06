require('../../utils/database/connection');
let Items = require('../../utils/database/models/items');

module.exports = {
  //get all items
  getItems : () =>{
    return Items.find()
  },
  //search by name on items
  searchItems : (name,id) =>{
    return Items.find(
     {$and :[ { $and: [ { $or: [{name : name },{description: name}] },{userID : id}]}
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
  //get all user items
  getAllUserItems : (id) =>{
    return Items.find({userID : id})
  }
}