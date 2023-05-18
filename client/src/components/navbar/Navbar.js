import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='top'>
      <div className='topLeft'>
        <i className='topIcon fab fa-facebook-square'></i>
        <i className='topIcon fab fa-twitter-square'></i>
        <i className='topIcon fab fa-pinterest-square'></i>
        <i className='topIcon fab fa-instagram-square'></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='topListItem'>HOME</li>
          <li className='topListItem'>ABOUT</li>
          <li className='topListItem'>CONTACT</li>
        </ul>
      </div>
      <div className='topRight'>
        <ul className='topList'>
          <li className='topListItem'>
            <Link to='/register'>Register</Link>
          </li>
          <li className='topListItem'>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
        <i className='topSearchIcon fas fa-search'></i>
      </div>
    </div>
  )
}
