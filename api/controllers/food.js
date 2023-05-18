const Food = require('../model/Food')

module.exports.createFood = async (req, res, next) => {
  const newFood = new Food(req.body)
  try {
    const savedFood = await newFood.save()
    res.status(200).json(savedFood)
  } catch (error) {
    next(error)
  }
}

module.exports.updateFood = async (req, res, next) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedFood)
  } catch (error) {
    next(error)
  }
}

module.exports.deleteFood = async (req, res, next) => {
  try {
    await Food.findByIdAndDelete(req.params.id)
    res.status(200).json('food has been deleted!')
  } catch (error) {
    res.status(500).json(error)
    next(error)
  }
}

module.exports.getFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id)
    res.status(200).json(food)
  } catch (error) {
    next(error)
  }
}

module.exports.getFoods = async (req, res, next) => {
  const query = req.query
  let foods
  try {
    if (query.new) {
      foods = await Food.find().sort({ _id: -1 }).limit(5)
    } else if (query.keyword) {
      const regex = new RegExp(query.keyword, 'i')
      foods = await Food.find({
        $or: [{ name: regex }, { desc: regex }],
      }).limit(5)
    } else {
      foods = await Food.find()
    }
    res.status(200).json(foods)
  } catch (error) {
    next(error)
  }
}
