const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { createError } = require('../utils/error')

module.exports.register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      position: req.body.position,
    })
    await newUser.save()
    res.status(200).send('User has been created')
  } catch (error) {
    next(error)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return next(createError(404, 'User not found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!isPasswordCorrect)
      return next(createError(400, 'Wrong passord or username'))

    const { password, positon, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    next(error)
  }
}
