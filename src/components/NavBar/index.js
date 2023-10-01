import React from "react";
import "./style.css";
import SearchIcon from "../../assets/recipeIcon.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <a className="web-title" href="/home">
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <span className="web-name">mai's recipe</span>
      </a>
      <div className="right-nav">
        <div className="search">
          <div>
            <a className="hover-line" href="ingredientSearch.html">
              <img src={SearchIcon} alt="Search Icon" /> search recipes
            </a>
          </div>
        </div>
        <div className="about">
          <a className="hover-line" href="/about">
            about
          </a>
        </div>
        <a href="/" className="profile-circle"></a>
      </div>
    </div>
  );
}
