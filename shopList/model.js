const mongoose = require('mongoose')

const shopListSchema = new mongoose.Schema({
  text: String,
  url: String,
  date: String,
  complete: Boolean
})

module.exports = mongoose.model('Todo', shopListSchema)
