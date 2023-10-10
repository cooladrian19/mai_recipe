import React from 'react';
import "./Login.css";


export default function Login() {
  return (
    <div>
      <div className="login-container">
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>

        <div className="login-field">
          <label>Email:</label>
          <input className="input-field" type="text" id="login-email" placeholder="email" />
          <label>Password:</label>
          <input className="input-field" type="password" id="login-password" placeholder="password" />
          <button id="login" className="login-button">Login</button>
          <div className="login-footer">No account? <a className="link" href="">Sign up</a></div>
        </div>

        <div className="login-field">
          <label>Username:</label>
          <input className="input-field" type="text" id="signup-username" placeholder="username" />
          <label>Email:</label>
          <input className="input-field" type="text" id="signup-email" placeholder="email" />
          <label>Password:</label>
          <input className="input-field" type="password" id="signup-password" placeholder="password" />
          <button id="signup" className="login-button">Signup</button>
          <div className="login-footer">Already have an account? <a className="link" href="">Sign in</a></div>
        </div>
      </div>
    </div>
  );
}
