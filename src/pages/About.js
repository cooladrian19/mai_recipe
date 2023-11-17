import React from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./About.css";
import AboutImg from "../assets/about1.png";

export default function About() {
  return (
    <div className="footer-margin">
      <Navbar />
      <div className="about-container">
        <div className="about-top">
          <div className="top-wrapper">
            <div className="about-img-container">
              <img src={AboutImg} alt="About Mai's Recipe"></img>
            </div>
            <div className="about-info-container">
              <h4>I'm Adrian, a Computer Science major developing Mai's Recipe - a full-stack culinary web application.</h4>
              <p>
                I wanted to create a tool that allows users to quickly access delicious recipes and start cooking. 
                After a long day, people return home hungry and often frustrated; the last thing they need is a 
                convoluted cooking process. Mai's Recipe is designed to simplify the meal decision-making process 
                without making things complicated. It's tailored for the modern individual seeking an easy and enjoyable 
                cooking experience.
              </p>
              <p>
                To bring my idea to life, I've integrated <a href="https://www.edamam.com/" target="_blank"><strong>Edamam's Recipe Search API</strong></a>, utilizing its free version. 
                This provides access to a wide array of recipes, but with restrictions to 10 API calls per minute and a monthly limit 
                of 100,000 calls. So please dont spam the API :)
              </p>
              <p>
                For user authentication and data storage, <a href="https://firebase.google.com/docs/auth" target="_blank"><strong>Google Firebase</strong></a> makes it easy and simple. It securely manages 
                user login and signup processes, while Firebase Storage houses user data, including personalized 
                settings and favorite recipes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
