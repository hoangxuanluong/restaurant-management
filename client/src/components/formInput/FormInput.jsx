import React from 'react'
import { useContext, useState } from 'react'
import './formInput.css'

export default function FormInput(props) {
  const { label, ...inputProps } = props
  const [food, setFood] = useState({
    name: undefined,
    price: undefined,
    desc: undefined,
    img: undefined,
  })

  const handleChange = (e) => {
    setFood((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }
  return (
    <div className='formInput'>
      <label className='addLabel'>{label}</label>
      <input className='addInput' {...inputProps} onChange={handleChange} />
    </div>
  )
}
