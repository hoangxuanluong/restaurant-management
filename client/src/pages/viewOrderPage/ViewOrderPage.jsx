import React, { useEffect, useRef, useState } from 'react'
import './viewOrderPage.css'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import axios from 'axios'
import moment from 'moment'
import { useLocation } from 'react-router-dom'
import ReactToPrint from 'react-to-print'

function ViewOrderPage() {
  const componentRef = useRef()
  const promiseResolveRef = useRef(null)
  const [data, setData] = useState({})
  const [foodText, setFoodText] = useState('')
  const [total, setTotal] = useState(0)
  const [food, setFood] = useState({})
  const [foods, setFoods] = useState([])
  const [tableFoodOpen, setTableFoodOpen] = useState(false)
  const [quantity, setQuantity] = useState(0)
  const [foodOrder, setFoodOrder] = useState([])
  const [addMoreOpen, setAddMoreOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)
  const id = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`)
        setData(res.data)
        setFoodOrder(
          res.data.foods.map(({ foodId, quantity }) => ({
            foodId: foodId._id,
            quantity,
          }))
        )
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [id])

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

  useEffect(() => {
    let totalBill = 0
    for (let i = 0; i < data.foods?.length; i++) {
      totalBill += data.foods[i].foodId?.price * data.foods[i].quantity
    }
    setTotal(totalBill)
  }, [data, data.foods, total])

  const handleAddFoodClick = (e) => {
    e.preventDefault()
    const allFoods = [
      ...data.foods.map(({ foodId, quantity }) => ({
        foodId: foodId._id,
        quantity,
      })),
      { foodId: food._id, quantity },
    ]
    setFoodOrder(allFoods)
    setAddMoreOpen(false)
    setFood(null)
    setFoodText('')

    const updateData = async () => {
      try {
        const res = await axios.put(`/api/orders/${id}`, { foods: allFoods })
        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    updateData()
  }

  const handleFoodClick = (food) => {
    setFood(food)
    setTableFoodOpen(false)
  }

  const handleDeleteFoodOrder = (idFood) => {
    setFoodOrder((foodOrder) => {
      const news = foodOrder.filter(
        (foodOrder, index) => foodOrder.foodId + index !== idFood
      )
      console.log(news)
      const updateData = async () => {
        try {
          const res = await axios.put(`/api/orders/${id}`, { foods: news })
          setData(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      updateData()
      return news
    })
  }

  useEffect(() => {
    if (printOpen && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current()
    }
  }, [printOpen])

  return (
    <>
      <ManagerNavbar />
      <div className='viewOrderPage'>
        <ManagerSidebar />
        <div className='viewOrder'>
          <div className='viewOrderWrapper' ref={componentRef}>
            <div className='orderId'>
              <span>Order:</span> {data._id}
            </div>
            <div className='orderTime'>
              <span>Time: </span>
              {moment(data.createdAt).format('LLL')}
            </div>
            <div className='tableOrder'>
              <span>Table: </span>
              {data.tableId?.at(0).id}
            </div>
            <div className='customerInfoWrapper'>
              <div className='customerInfoHeader'>Customer:</div>
              <div className='customerInfos'>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Name:</div>
                  <div className='customerInfoValue'>
                    {data.customerId?.name}
                  </div>
                </div>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Email:</div>
                  <div className='customerInfoValue'>
                    {data.customerId?.email}
                  </div>
                </div>
                <div className='customerInfo'>
                  <div className='customerInfoLabel'>Tel:</div>
                  <div className='customerInfoValue'>
                    {data.customerId?.tel}
                  </div>
                </div>
              </div>
            </div>
            <div className='foodsWrapper'>
              <div className='foodsHeader'>Foods:</div>
              <div className='foodsSelect'>
                <div className='foodsSelectTable'>
                  {addMoreOpen && (
                    <div className='chooseFoodOrder'>
                      <div className='chooseFoodOrderHeader'>Choose Food</div>
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
                            onChange={(e) => setQuantity(e.target.value)}
                            type='number'
                            required
                          />
                        </div>
                        <button
                          className='addFoodButton'
                          onClick={handleAddFoodClick}
                        >
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
                    </div>
                  )}

                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Food</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        {printOpen === false && <th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {data.foods?.map((food, index) => (
                        <tr key={index + ' ' + food._id}>
                          <td>{index + 1}</td>
                          <td>{food.foodId?.name}</td>
                          <td>{food.foodId?.price}</td>
                          <td>{food.quantity}</td>
                          <td>{food.quantity * food.foodId?.price}</td>
                          {printOpen === false && (
                            <td>
                              <button
                                className='deleteButton'
                                onClick={() =>
                                  handleDeleteFoodOrder(food.foodId._id + index)
                                }
                              >
                                Delete
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='orderBillFooter'>
                    <div className='totalBill'>
                      <span>Total:</span>
                      {total}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='billFooterButton'>
            <div
              className='addMoreFoodButton'
              onClick={() => setAddMoreOpen(!addMoreOpen)}
            >
              Add more
            </div>
            <ReactToPrint
              trigger={() => <div className='printBillButton'>Print Bill</div>}
              content={() => componentRef.current}
              onBeforeGetContent={() => {
                return new Promise((resolve) => {
                  promiseResolveRef.current = resolve
                  setPrintOpen(true)
                })
              }}
              onAfterPrint={() => {
                setPrintOpen(false)
              }}
            />
            <div className='paymentButton'>Payment</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewOrderPage
