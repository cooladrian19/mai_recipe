import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Recipes({
  id,
  title,
  image,
  calories,
  ingredients,
  type,
  time,
}) {
  const recipeId = id.split("_").pop();

  return (
    <Link className="recipes-card" to={`/details/${recipeId}`}>
      <img src={image} alt={title} className="recipes-img-contain"></img>

      <div className="recipes-card-body">
        <div className="recipes-details-contain">
          <h4>{title}</h4>
          <p>
            {" "}
            <span>meal type:</span> {type}
          </p>
          <p>
            {" "}
            <span>calories:</span> {calories}
          </p>
          <p>
            {" "}
            <span>ingredients:</span>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.food}
                  {index < ingredients.length - 1 ? ", " : ""}
                </li>
              ))}
            </ul>
          </p>
        </div>

        <div className="recipes-card-bottom">
          <p>{time} mins</p>
          <i class="fa-regular fa-clock"></i>
        </div>
      </div>
    </Link>
  );
}
