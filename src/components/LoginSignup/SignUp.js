import "./style.css";
import { Link } from 'react-router-dom';

export default function SignUp( { onSignup } ) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target['signup-email'].value;
    const password = e.target['signup-password'].value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return; 
    }

    onSignup(email, password);
  }
    

  return (
    <div className='login-container' >
        <div className="sprite-container">
          <Link to="/home" className="mai-sprite"></Link>
        </div>
        <form className="login-field" onSubmit={handleSubmit}>
            {/* 
          <div className='login-section-container'>
            <label>Username:</label>
            <input className="input-field" type="text" id="signup-username" placeholder="username" />
          </div>
          */}
          <div className='login-section-container'>
            <label>Email:</label>
            <input className="input-field" type="text"  id="signup-email" placeholder="email" required />
          </div>
          <div className='login-section-container'>
            <label>Password:</label>
            <input className="input-field" type="password"  id="signup-password" placeholder="password"  required/>
          </div>
          <div className='login-section-container'>
            <label>confirm password:</label>
            <input className="input-field" type="password"  id="confirm-password" placeholder="password" required/>
          </div>

          <button id="signup" className="login-button" type='submit'>Signup</button>
          <div className="login-footer">Already have an account? <Link to="/auth/login" className="link" href="">Sign in</Link></div>
        </form>
    </div>
  )
}
