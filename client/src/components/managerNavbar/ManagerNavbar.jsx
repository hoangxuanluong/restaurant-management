import React from 'react'
import './managerNavbar.css'

export default function ManagerNavbar() {
  return (
    <div className='nav'>
      <div className='navLeft'>Restaurant Management System</div>

      <div className='navRight'>
        <i className='navIcon fab fa-facebook-square'></i>
        <i className='navIcon fab fa-twitter-square'></i>
        <i className='navIcon fab fa-pinterest-square'></i>
        <i className='navIcon fab fa-instagram-square'></i>
      </div>
    </div>
  )
}
