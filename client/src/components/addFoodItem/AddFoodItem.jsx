import React, { useEffect } from 'react'
import axios from 'axios'
import { useContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import './addFoodItem.css'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function AddFoodItem() {
  const [open, setOpen] = React.useState(false)
  const [food, setFood] = useState({
    name: undefined,
    price: undefined,
    desc: undefined,
    img: undefined,
  })

  const handleChange = (e) => {
    setFood((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/foods', food)
      setOpen(true)
      console.log(res)
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
    console.log(food)
  })

  return (
    <div className='addFoodItem'>
      <form className='addForm'>
        <h1 className='addTitle'>Add Food</h1>
        <div className='formInput'>
          <label className='addLabel'>Name:</label>
          <input
            className='addInput'
            type='text'
            id='name'
            placeholder='Enter your food name'
            onChange={handleChange}
          />
        </div>
        <div className='formInput'>
          <label className='addLabel'>Price:</label>
          <input
            className='addInput'
            id='price'
            placeholder='Enter food price'
            onChange={handleChange}
          />
        </div>
        <div className='formInput'>
          <label className='addLabel'>Description:</label>
          <input
            className='addInput'
            id='desc'
            placeholder='Description'
            onChange={handleChange}
          />
        </div>
        <div className='formInput'>
          <label className='addLabel'>Image Url:</label>
          <input
            className='addInput'
            id='img'
            placeholder='Enter food image url'
            onChange={handleChange}
          />
        </div>
        <button className='addButton' onClick={handleClick}>
          Add Item
        </button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Create food succesfully!
        </Alert>
      </Snackbar>
    </div>
  )
}
