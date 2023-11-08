import "./style.css";
import { Link } from "react-router-dom";
import React from 'react'

export default function MiniRecipes({ recipe }) {

    const recipeId = recipe.recipe.uri.split("_").pop();

  return (
    <Link to={`/details/${recipeId}`} className="mini-card">
      <img src={recipe.recipe.image} alt={recipe.recipe.label} className="mini-image" />
      <div className="mini-info">
        <h3>{recipe.recipe.label}</h3>
        <p>Calories: {Math.round(recipe.recipe.calories)}</p>
      </div>
    </Link>
  )
}
