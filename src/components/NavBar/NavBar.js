import React from "react";
import SearchIcon from "../../assets/recipeIcon.png";
import "./style.css";

export default function NavBar() {
  return (
    <div className="nav-container">
      <a className="web-title" href="/">
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <span className="web-name">mai's recipe</span>
      </a>
      <div className="right-nav">
        <div className="search">
            <a className="hover-line" href="/searchIngredients">
              <img src={SearchIcon} alt="Search Icon" /> search by ingredients
            </a>
        </div>
        <div className="about">
          <a className="hover-line" href="/about">
            about
          </a>
        </div>
        <a href="/profile" className="profile-circle"></a>
      </div>
    </div>
  );
}
