import React from "react";
import "./style.css";


export default function Recipes({ title, image, calories, type, time }) {
  return (
        <div className="recipes-card">
        <div className="recipes-img-contain">
          <img src={image} alt={title}></img>
        </div>
        <div className="recipes-details-contain">
          <h4>{title}</h4>
          <p> <span>cuisine type:</span> {type}</p>
          <p> <span>calories:</span> {calories}</p>   
        </div>

      <div className="recipes-card-bottom">
          <p>{time} mins</p>
          <div className="time-container">
          <i className="gg-time"></i>
          </div>
        
      </div>

    </div>
    
  );
}