import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../FirebaseConfig.js";
import SearchIcon from "../../assets/recipeIcon.png";
import defaultProfile from "../../assets/defaultProfile.png";
import { Link } from "react-router-dom";
import "./style.css";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("body-no-scroll", isMenuOpen);
  }, [isMenuOpen]);

  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="nav-container">
      <Link to="/home" className="web-title" >
        <div className="sprite-container">
          <div className="mai-sprite"></div>
        </div>
        <span className="web-name">mai's recipe</span>
      </Link>

      <input
        className="check-hamburger"
        type="checkbox"
        id="hamburger"
        checked={isMenuOpen}
        onChange={handleHamburgerClick}
      ></input>
      <label className="icon-hamburger" htmlFor="hamburger">
        {isMenuOpen ? (
          <i className="fa-solid fa-xmark fa-lg"></i>
        ) : (
          <i className="fa-solid fa-bars fa-lg"></i>
        )}
      </label>

      <ul className="ul-nav">
        <li>
          <a className="search">
            <Link to="/searchIngredients" className="hover-line">
              <img src={SearchIcon} alt="Search Icon" /> search by ingredients
            </Link>
          </a>
        </li>
        <li>
          <Link to="/about" className="hover-line about">
            about
          </Link>
        </li>
        {/*Profile pic here */}
        <li>
          <a onClick={handleProfileClick} className="hover-line profile-circle">
            {user ? (
              <img
                src={user.photoURL || defaultProfile}
                alt="Profile"
                className="nav-profile-image"
              />
            ) : (
              <i className="fa-solid fa-user" style={{ fontSize: "22px" }}></i>
            )}
          </a>
        </li>
      </ul>
    </nav>
  );
}
