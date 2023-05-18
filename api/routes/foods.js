const express = require('express')
const Food = require('../model/Food')
const {
  createFood,
  updateFood,
  getFood,
  getFoods,
  deleteFood,
} = require('../controllers/food')

const router = express.Router()

router.post('/', createFood)

router.put('/:id', updateFood)

//DELETE ALL
// router.delete('/', async (req, res) => {
//   try {
//     await Food.deleteMany({})
//     res.status(200).json('delete all')
//   } catch (error) {
//     res.status(500).json(error)
//   }
// })

router.delete('/:id', deleteFood)

router.get('/:id', getFood)

router.get('/', getFoods)

module.exports = router
