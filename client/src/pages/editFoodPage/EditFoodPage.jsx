import React, { useEffect } from 'react'
import axios from 'axios'
import { useContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import './editFoodPage.css'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import { Alert } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

function EditFoodPage() {
  const [data, setData] = useState()
  const [open, setOpen] = React.useState(false)
  const [food, setFood] = useState({
    name: '',
    price: '',
    desc: '',
    img: '',
  })
  const location = useLocation()
  const id = location.pathname.split('/')[2]
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFood((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`/api/foods/${id}`, food)
      setOpen(true)
      navigate('/foods')
    } catch (err) {
      console.log(err)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/foods/${id}`)
        setFood(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <ManagerNavbar />
      <div className='editFoodPage'>
        <ManagerSidebar />
        <div className='editFoodItem'>
          <form className='editForm'>
            <h1 className='editTitle'>Edit Food</h1>
            <div className='formInput'>
              <label className='editLabel'>Name:</label>
              <input
                className='editInput'
                type='text'
                id='name'
                placeholder='Enter your food name'
                value={food.name}
                onChange={handleChange}
              />
            </div>
            <div className='formInput'>
              <label className='editLabel'>Price:</label>
              <input
                className='editInput'
                id='price'
                placeholder='Enter food price'
                value={food.price}
                onChange={handleChange}
              />
            </div>
            <div className='formInput'>
              <label className='editLabel'>Description:</label>
              <input
                className='editInput'
                id='desc'
                placeholder='Description'
                value={food.desc}
                onChange={handleChange}
              />
            </div>
            <div className='formInput'>
              <label className='editLabel'>Image Url:</label>
              <input
                className='editInput'
                id='img'
                placeholder='Enter food image url'
                value={food.img}
                onChange={handleChange}
              />
            </div>
            <button className='editButton' onClick={handleClick}>
              Edit Item
            </button>
          </form>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Create food succesfully!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  )
}

export default EditFoodPage
