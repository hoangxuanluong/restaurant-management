import React from 'react'
import './login.css'
function Login() {
  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <form className='loginForm'>
        <label>Username</label>
        <input
          className='loginInput'
          type='text'
          placeholder='Enter your username...'
        />
        <label>Password</label>
        <input
          className='loginInput'
          type='password'
          placeholder='Enter your password...'
        />
        <button className='loginButton'>Login</button>
      </form>
      <button className='loginRegisterButton'>Register</button>
    </div>
  )
}

export default Login
