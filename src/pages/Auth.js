import React from 'react';
import Login from '../components/LoginSignup/Login';
import SignUp from '../components/LoginSignup/SignUp';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';

export default function Auth() {

  const navigate = useNavigate();
  const auth = getAuth()

  const handleSignup = (email, password) => {
    console.log('handleLogin called with:', email, password); 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('User signed in:', userCredential); 
        console.log(userCredential, "auth data");
        navigate('/home');
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error during login:",error.message);
      });
  }

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential, "auth data");
        navigate('/home');
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error during login:",error.message);
      });
  }

  return (
    <div className="footer-margin">
      <Routes>
        <Route path="/signup" element={<SignUp onSignup={handleSignup} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}
