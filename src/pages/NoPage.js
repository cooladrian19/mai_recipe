import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import four from '../assets/404.jpeg';
import "./NoPage.css";

export default function NoPage() {
  return (
    <div className="footer-margin">
        <NavBar />
        <div className='four-contain'>
        <img src={four} className='four'></img>
        </div>
        
        <Footer />
    </div>
  )
}
