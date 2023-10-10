import React from "react";
import "./style.css";

export default function Search() {
  return (
    <div className="container">
      <label for="searchRecipe" className="search-label">
        search by name
      </label>
      <form className="search-container">
        <input type="search" className="searchRecipeInput" placeholder="enter any type of food..."></input>
        <button type="submit" className="searchRecipeButton">search</button>
      </form>

      
    </div>
  );
}
