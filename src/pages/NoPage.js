import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import "./NoPage.css";

export default function NoPage() {
  return (
    <div className="footer-margin">
        <NavBar />
        <h1>ERROR: 404 Doesnt exist</h1>
        <Footer />
    </div>
  )
}
