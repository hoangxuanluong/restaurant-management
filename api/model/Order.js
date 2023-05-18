const mongoose = require('mongoose')
const { Schema } = mongoose

const OrderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
    },
    tableId: {
      type: [Schema.Types.ObjectId],
      ref: 'Table',
    },
    foods: [
      {
        foodId: {
          type: Schema.Types.ObjectId,
          ref: 'Food',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', OrderSchema)
