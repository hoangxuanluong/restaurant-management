const express = require('express')
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderTable,
  getIncome,
  getFoodStat,
} = require('../controllers/order')

const router = express.Router()

router.post('/', createOrder)

router.put('/:id', updateOrder)

router.delete('/:id', deleteOrder)

router.get('/income', getIncome)

router.get('/foodStat', getFoodStat)

router.get('/:id', getOrder)

router.get('/', getOrders)

module.exports = router
