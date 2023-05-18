const Table = require('../model/Table')

module.exports.createTable = async (req, res, next) => {
  const newTable = new Table(req.body)
  try {
    const savedTable = await newTable.save()
    res.status(200).json(savedTable)
  } catch (error) {
    next(error)
  }
}

module.exports.updateTable = async (req, res, next) => {
  try {
    const updatedTable = await Table.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedTable)
  } catch (error) {
    next(error)
  }
}

module.exports.deleteTable = async (req, res, next) => {
  try {
    await Table.findByIdAndDelete(req.params.id)
    res.status(200).json('Table has been deleted!')
  } catch (error) {
    res.status(500).json(error)
    next(error)
  }
}

module.exports.getTable = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id)
    res.status(200).json(table)
  } catch (error) {
    next(error)
  }
}

module.exports.getTables = async (req, res, next) => {
  try {
    const tables = await Table.find()
    res.status(200).json(tables)
  } catch (error) {
    next(error)
  }
}
