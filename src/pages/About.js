import React from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./About.css";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="card-container">
        <div className="card">
          <legend className="card-title">about me</legend>
          <p className="card-info">Hi, my name is Adrian Nguyen. I am a computer science major.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
