const conn = require('mongoose');
module.exports = conn.connect('mongodb://project-db:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });