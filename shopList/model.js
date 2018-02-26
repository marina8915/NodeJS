const mongoose = require('mongoose')

const shopListSchema = new mongoose.Schema({
    text: String
})

module.exports = mongoose.model('Todo', shopListSchema)