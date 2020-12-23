var express = require('express');
var router = express.Router();
const logic = require('./logic');

let error = err => {
    console.log('err', err)
    res.status(400);
    res.end("eroare")
}

//Request to search items by name
router.get('/:USERS_ID/items/search/:name', function (req, res, next) {
    logic.searchItems(req.params.name, req.params.USERS_ID).then(items => {
        res.json(items)
    }).catch(err => {
        return error(err)
    })
});

//Request to get one item of an user
router.get('/:USERS_ID/items/:ITEM_ID', function (req, res, next) {
    logic.getOneItem(req.params.ITEM_ID).then(items => {
        res.json(items)
    }).catch(err => {
        return error(err)
    })
});

//Request for geting all the items
router.get('/items', function (req, res, next) {
    logic.getItems().then(items => {
        res.json(items);
    }).catch(err => {
        return error(err)
    })
});

//Request to get the items of an user for pagination
router.get('/:USERS_ID/items/', function (req, res, next) {
    logic.getAllUserItems(req.params.USERS_ID).then(allitems => {
        logic.getUserItems(req.params.USERS_ID, req.query.page, req.query.rows).then(items => {
            res.json({ items: items, count: allitems.length })
        }).catch(err => {
            return error(err)
        })
    })
});

//Request to delete an item of an user
router.delete('/:USERS_ID/items/:ITEM_ID', function (req, res, next) {
    logic.deleteItem(req.params.ITEM_ID).then(() => {
        res.end("Item succesfully deleted")
    }).catch(err => {
        return error(err)
    })
});

//Request for creating item for an user
router.post('/:USERS_ID/items', function (req, res, next) {
    logic.createItem(req.body, req.params.USERS_ID).then(() => {
        res.end("Item succesfully created")
    }).catch(err => {
        return error(err)
    })
});

//Request to update an item
router.put('/:USERS_ID/items/:ITEM_ID', function (req, res, next) {
    logic.updateItem(req.params.ITEM_ID, req.body).then(() => {
        res.end("Item succesfully updated")
    }).catch(err => {
        return error(err)
    })
})

module.exports = router;