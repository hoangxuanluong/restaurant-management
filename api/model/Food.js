const mongoose = require('mongoose')
const { Schema } = mongoose

const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
})

module.exports = mongoose.model('Food', FoodSchema)
