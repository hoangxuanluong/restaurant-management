const mongoose = require('mongoose')
const { Schema } = mongoose

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  tel: {
    type: String,
    unique: true,
    required: true,
  },
})

module.exports = mongoose.model('Customer', CustomerSchema)
