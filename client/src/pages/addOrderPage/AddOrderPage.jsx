import React, { useEffect, useRef, useState } from 'react'
import './addOrderPage.css'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { productColumns } from '../manageProductPage/ManageProductPage'
import List from '../../components/table/Table'
import { useNavigate } from 'react-router-dom'

function AddOrderPage() {
  const navigate = useNavigate()
  const quantityInputRef = useRef(null)
  const [customers, setCustomers] = useState([])
  const [customer, setCustomer] = useState({})
  const [tableOpen, setTableOpen] = useState(false)
  const [customerText, setCustomerText] = useState('')
  const [foodText, setFoodText] = useState('')
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)
  const [addFoodOpen, setAddFoodOpen] = useState(false)
  const [customerValue, setCustomerValue] = useState({})
  const [tables, setTables] = useState([])
  const [tablesSelection, setTablesSelection] = useState([])
  const [tableFoodOpen, setTableFoodOpen] = useState(false)
  const [food, setFood] = useState({})
  const [foods, setFoods] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [foodOrder, setFoodOrder] = useState([])
  const [total, setTotal] = useState(0)

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'desc',
      headerName: 'Description',
      width: 700,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/customers?keyword=${customerText}`)
        setCustomers(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (customerText.length >= 2) {
      setTableOpen(true)
      fetchData()
    } else {
      setTableOpen(false)
    }
  }, [customerText])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/foods?keyword=${foodText}`)
        setFoods(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (foodText.length >= 2) {
      setTableFoodOpen(true)
      fetchData()
    } else {
      setTableFoodOpen(false)
    }
  }, [foodText])

  const handleCustomerClick = (customer) => {
    setCustomer(customer)
    console.log(customer)
    setTableOpen(false)
  }

  const handleFoodClick = (food) => {
    setFood(food)
    setTableFoodOpen(false)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const pushData = async () => {
      try {
        const res = await axios.post('/api/customers', customerValue)
        setAddCustomerOpen(false)
        setCustomer(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    pushData()
  }

  const handeCustomerChange = (e) => {
    setCustomerValue({ ...customerValue, [e.target.id]: e.target.value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/tables')
        setTables(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('table', tablesSelection)
  }, [tablesSelection])

  const handleAddFoodClick = (e) => {
    e.preventDefault()
    setFoodOrder((foodOrder) => {
      return [...foodOrder, { ...food, quantity: parseInt(quantity) }]
    })
    setTotal(total + food.price * quantity)
    setFood(null)
    setFoodText('')
    quantityInputRef.current.value = ''
  }

  useEffect(() => {
    let totalBill = 0
    for (let i = 0; i < foodOrder.length; i++) {
      totalBill += foodOrder[i].price * foodOrder[i].quantity
    }
    setTotal(totalBill)
  }, [foodOrder, total])

  const handleDeleteFoodOrder = (id) => {
    setFoodOrder((foodOrder) => {
      return foodOrder.filter(
        (foodOrder, index) => foodOrder._id + index !== id
      )
    })
    console.log(foodOrder, total)
    // setTotal(total - foodOrder.price * foodOrder.quantity)
  }

  const handleCreateOrderClick = async () => {
    try {
      const customer_id = customer._id
      const foodSelect = foodOrder.map((food) => ({
        foodId: food._id,
        quantity: food.quantity,
      }))
      const res = await axios.post('/api/orders', {
        customerId: customer._id,
        tableId: tablesSelection,
        foods: foodSelect,
      })
      console.log(res)
      navigate('/manageOrder')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='addOrderWrapper'>
        <ManagerNavbar />
        <div className='addOrderPage'>
          <ManagerSidebar />
          <div className='addOrderPageWrapper'>
            <div className='addCustomer'>
              <div className='addCustomerHeader'>Customer</div>
              <div className='addCustomerWrapper'>
                <input
                  type='search'
                  className='addCustomerSearch'
                  placeholder='search customer....'
                  value={customerText}
                  onChange={(e) => setCustomerText(e.target.value)}
                />
                <button
                  className='addCustomerButton'
                  onClick={() => setAddCustomerOpen(!addCustomerOpen)}
                >
                  Add new
                </button>
              </div>

              <div className='customerInfos'>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Name:</div>
                  <div className='customerInfoValue'>{customer.name}</div>
                </div>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Email:</div>
                  <div className='customerInfoValue'>{customer.email}</div>
                </div>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Tel:</div>
                  <div className='customerInfoValue'>{customer.tel}</div>
                </div>
              </div>
              {addCustomerOpen && (
                <div className='addNewCustomerWrapper'>
                  <form className='addCustomerForm'>
                    {/* <h1 className='addTitle'>Add customer</h1> */}
                    <div className='addFormInput'>
                      <label className='addLabel'>Name:</label>
                      <input
                        className='addCustomerInput'
                        type='text'
                        id='name'
                        placeholder='name...'
                        onChange={handeCustomerChange}
                      />
                    </div>
                    <div className='addFormInput'>
                      <label className='addLabel'>Email</label>
                      <input
                        className='addCustomerInput'
                        id='email'
                        placeholder='email...'
                        onChange={handeCustomerChange}
                      />
                    </div>
                    <div className='addFormInput'>
                      <label className='addLabel'>Tel:</label>
                      <input
                        className='addCustomerInput'
                        id='tel'
                        placeholder='tel...'
                        onChange={handeCustomerChange}
                      />
                    </div>
                    <button
                      className='addNewCustomerButton'
                      onClick={handleClick}
                    >
                      Add Customer
                    </button>
                  </form>
                </div>
              )}
              {tableOpen && (
                <div className='customerTable'>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Tel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr
                          key={customer._id}
                          onClick={() => handleCustomerClick(customer)}
                        >
                          <td>{customer.name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.tel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className='chooseTable'>
              <div className='chooseTableHeader'>Choose Table</div>
              <div className='datatable'>
                <DataGrid
                  className='datagrid'
                  rows={tables}
                  columns={columns}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  checkboxSelection
                  getRowId={(row) => row._id}
                  editMode='row'
                  onRowSelectionModelChange={(newRowSelectionModel) => {
                    setTablesSelection(newRowSelectionModel)
                    const selectedIDs = new Set(newRowSelectionModel)
                    const selectedRowData = tables.filter((row) =>
                      selectedIDs.has(row._id.toString())
                    )
                    console.log(selectedRowData)
                  }}
                />
              </div>
            </div>
            <div className='chooseFood'>
              <div className='chooseFoodHeader'>Choose Food</div>
              <div className='addFoodWrapper'>
                <input
                  type='search'
                  className='addFoodSearch'
                  placeholder='search food....'
                  value={foodText}
                  onChange={(e) => setFoodText(e.target.value)}
                />
              </div>
              <div className='foodInfos'>
                <div className='foodInfo'>
                  <div className='foodInfoLabel'>Name:</div>
                  <div className='foodInfoValue'>{food?.name}</div>
                </div>
                <div className='foodInfo'>
                  <div className='foodInfoLabel'>Price:</div>
                  <div className='foodInfoValue'>{food?.price}</div>
                </div>
                <div className='foodInfo'>
                  <div className='foodInfoLabel'>Desc:</div>
                  <div className='foodInfoValue'>{food?.desc}</div>
                </div>
                <div className='foodInfo'>
                  <div className='foodInfoLabel'>Quantity:</div>
                  <input
                    className='foodInfoValue quantity'
                    onChange={() => setQuantity(quantityInputRef.current.value)}
                    ref={quantityInputRef}
                    type='number'
                    required
                  />
                </div>
                <button className='addFoodButton' onClick={handleAddFoodClick}>
                  Add
                </button>
              </div>
              {tableFoodOpen && (
                <div className='foodTable'>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Decription</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foods.map((food) => (
                        <tr
                          key={food._id}
                          onClick={() => handleFoodClick(food)}
                        >
                          <td>{food.name}</td>
                          <td>{food.price}</td>
                          <td>{food.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className='foodTable'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Decription</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodOrder.map((food, index) => (
                      <tr key={index + ' ' + food._id}>
                        <td>{food?.name}</td>
                        <td>{food?.price}</td>
                        <td>{food?.desc}</td>
                        <td>{food?.quantity}</td>
                        <td>{food?.quantity * food?.price}</td>
                        <td>
                          <button
                            className='deleteButton'
                            onClick={() =>
                              handleDeleteFoodOrder(food._id + index)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='addOrderFooter'>
                <div className='total'>Total: {parseInt(total)}</div>
                <button
                  className='createOrderButton'
                  onClick={handleCreateOrderClick}
                >
                  Create Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddOrderPage
