const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const tablesRoute = require('./routes/tables')
const foodsRoute = require('./routes/foods')
const customersRoute = require('./routes/customers')
const ordersRoute = require('./routes/orders')

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO)
    console.log('connect to mongodb')
  } catch (error) {
    throw error
  }
}

mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected!')
})

mongoose.connection.on('connected', () => {
  console.log('mongodb connected!')
})

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/tables', tablesRoute)
app.use('/api/foods', foodsRoute)
app.use('/api/customers', customersRoute)
app.use('/api/orders', ordersRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

app.listen(8080, () => {
  connect()
  console.log('Listening on port 8080!')
})
