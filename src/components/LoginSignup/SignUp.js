import React, {useRef} from 'react'
import "./style.css";




export default function SignUp() {

    

  return (
    <form className='login-container'>
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <div className="login-field">
            {/* 
          <div className='login-section-container'>
            <label>Username:</label>
            <input className="input-field" type="text" id="signup-username" placeholder="username" />
          </div>
          */}
          <div className='login-section-container'>
            <label>Email:</label>
            <input className="input-field" type="text"  id="signup-email" placeholder="email" />
          </div>
          <div className='login-section-container'>
            <label>Password:</label>
            <input className="input-field" type="password"  id="signup-password" placeholder="password" />
          </div>
          <div className='login-section-container'>
            <label>confirm password:</label>
            <input className="input-field" type="password"  id="signup-password" placeholder="password" />
          </div>

          <button id="signup" className="login-button" type='submit'>Signup</button>
          <div className="login-footer">Already have an account? <a className="link" href="">Sign in</a></div>
        </div>
    </form>
  )
}
