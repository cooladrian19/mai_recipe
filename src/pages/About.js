import React from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./About.css";
import AboutImg from "../assets/about.jpg";

export default function About() {
  return (
    <div className="footer-margin">
      <Navbar />
      <div className="about-container">
        <div className="about-top">
          <div className="top-wrapper">
            <div className="about-img-container">
              <img src={AboutImg}></img>
            </div>
            <div className="about-info-container">
              <h4>I'm adrian, a computer science major developing a solo culinary full-stack web application.</h4>
              <p>I wanted to create a tool that allows users to open it up quickly and start cooking. 
                People return home hungry and often frustrated and the last thing they need is a convoluted cooking process. 
                mai's recipe is meant to be a solution that streamlines the meal decision process without compromising on effectiveness. 
                It's a tool designed for the modern individual seeking an easy and enjoyable cooking experience</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
