const express = require('express')
const {
  updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  createCustomer,
} = require('../controllers/customer')
const Customer = require('../model/Customer')

const router = express.Router()

const customers = [
  {
    name: 'Matthiew',
    email: 'mandreas0@webmd.com',
    tel: '158-206-2870',
  },
  {
    name: 'Emily',
    email: 'ehandover1@si.edu',
    tel: '567-987-0825',
  },
  {
    name: 'Ware',
    email: 'wtoffalo2@ibm.com',
    tel: '667-148-1714',
  },
  {
    name: 'Janaya',
    email: 'jreaney3@squidoo.com',
    tel: '276-982-7090',
  },
  {
    name: 'Lainey',
    email: 'lgynne4@cbsnews.com',
    tel: '159-610-8865',
  },
  {
    name: 'Adela',
    email: 'ahornig5@microsoft.com',
    tel: '240-416-2395',
  },
  {
    name: 'Jeana',
    email: 'jwiffill6@barnesandnoble.com',
    tel: '143-606-1445',
  },
  {
    name: 'Gustavo',
    email: 'gcoryndon7@cnet.com',
    tel: '496-633-4046',
  },
  {
    name: 'Jyoti',
    email: 'jrattrie8@netvibes.com',
    tel: '470-853-6069',
  },
  {
    name: 'Fabian',
    email: 'fbernardeau9@va.gov',
    tel: '516-869-4180',
  },
  {
    name: 'Yoko',
    email: 'ywarwicka@reverbnation.com',
    tel: '487-592-7686',
  },
  {
    name: 'Mireille',
    email: 'mstreatb@github.io',
    tel: '543-420-3992',
  },
  {
    name: 'Horace',
    email: 'hsuffieldc@altervista.org',
    tel: '552-100-1271',
  },
  {
    name: 'Tymon',
    email: 'tbrewertond@about.com',
    tel: '911-771-4316',
  },
  {
    name: 'Felita',
    email: 'frootee@salon.com',
    tel: '277-576-2226',
  },
]

router.get('/createMany', async (req, res, next) => {
  try {
    customers = await Customer.insertMany(customers)
    res.status(200).json(customers)
  } catch (error) {
    next(error)
  }
})

router.post('/', createCustomer)

router.put('/:id', updateCustomer)

router.delete('/:id', deleteCustomer)

router.get('/:id', getCustomer)

router.get('/', getCustomers)

module.exports = router
