import React from 'react'
import "./style.css";

export default function Login() {
  return (
    <form className='login-container'>
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <form className="login-field">
          <div className='login-section-container'>
            <label>Email:</label>
            <input className="input-field" type="text" id="login-email" placeholder="email" />
          </div>

          <div className='login-section-container'>
            <label>Password:</label>
            <input className="input-field" type="password" id="login-password" placeholder="password" />
          </div>
          
          <button id="login" className="login-button" type='submit' >Login</button>
          <div className="login-footer">No account? <a className="link" href="">Sign up</a></div>
        </form>


    </form>
  )
}
