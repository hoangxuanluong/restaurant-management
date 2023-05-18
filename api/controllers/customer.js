const Customer = require('../model/Customer')

module.exports.createCustomer = async (req, res, next) => {
  const newCustomer = new Customer(req.body)
  try {
    const savedCustomer = await newCustomer.save()
    res.status(200).json(savedCustomer)
  } catch (error) {
    next(error)
  }
}

module.exports.updateCustomer = async (req, res, next) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(updatedCustomer)
  } catch (err) {
    next(err)
  }
}
module.exports.deleteCustomer = async (req, res, next) => {
  try {
    await Customer.findByIdAndDelete(req.params.id)
    res.status(200).json('Customer has been deleted.')
  } catch (err) {
    next(err)
  }
}
module.exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id)
    res.status(200).json(customer)
  } catch (err) {
    next(err)
  }
}
module.exports.getCustomers = async (req, res, next) => {
  const query = req.query
  let customers
  try {
    if (query.new) {
      customers = await Customer.find().sort({ _id: -1 }).limit(5)
    } else if (query.keyword) {
      const regex = new RegExp(query.keyword, 'i')
      customers = await Customer.find({
        $or: [{ name: regex }, { email: regex }, { tel: regex }],
      }).limit(5)
    } else {
      customers = await Customer.find()
    }

    res.status(200).json(customers)
  } catch (err) {
    next(err)
  }
}
