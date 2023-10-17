import React from 'react';
import Login from '../components/LoginSignup/Login';
import SignUp from '../components/LoginSignup/SignUp';
import { AuthProvider } from '../contexts/AuthContext';

export default function Auth() {
  return (
    <div className="footer-margin">
      
      <SignUp />
      
    </div>
  );
}
