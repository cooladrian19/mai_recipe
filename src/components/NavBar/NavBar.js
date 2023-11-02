import React from "react";
import SearchIcon from "../../assets/recipeIcon.png";
import "./style.css";

export default function NavBar() {
  return (
    <nav className="nav-container">
      <a className="web-title" href="/">
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <span className="web-name">mai's recipe</span>
      </a>

      <input className="check-hamburger" type="checkbox" id="hamburger"></input>
      <label className="icon-hamburger" htmlFor="hamburger">
        <i class="fa-solid fa-bars"></i>
      </label>
      

      <ul className="ul-nav">
        <li>
          <a className="search">
            <a className="hover-line" href="/searchIngredients">
              <img src={SearchIcon} alt="Search Icon" /> search by ingredients
            </a>
          </a>
        </li>
        <li>
          <a className="about">
            <a className="hover-line" href="/about">
              about
            </a>
          </a>
        </li>
        <li>
          <a href="/profile" className="profile-circle" class="hover-line"><i className="fa-regular fa-user" ></i></a>
        </li>
      </ul>
    </nav>
  );
}
