const conn = require('mongoose');
module.exports = conn.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });