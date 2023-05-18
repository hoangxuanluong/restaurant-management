const mongoose = require('mongoose')
const { Schema } = mongoose

const TableSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  status: {
    type: String,
    enum: ['available', 'occupied'],
    default: 'available',
  },
  img: {
    type: String,
  },
})

module.exports = mongoose.model('Table', TableSchema)
