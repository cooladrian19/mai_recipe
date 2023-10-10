import React from "react";
import "./Details.css";

import mockImage1 from '../assets/mock/mock-image-1.jpg';

export default function Details() {


    const mockTrending = [
        {
          title: "Mock Recipe 1",
          image: mockImage1,
        },
       
      ];


  return (
    <div>
      {/* DETAIL HEADER */}

      {mockTrending.map((recipe, index) => (
        <div className="detail-header">
            <div className="detail-img">
              <img src={recipe.image} alt={recipe.title} />  
            </div>
            <div className="detail-background" >
              <img src={recipe.image} />  
            </div>
          
          
        </div>
      ))}

      {/* DETAIL BODY */}
      <div className="detail-body">
        <div className="detail-ingredients">
          <h3>ingredients:</h3>
          <ul>
            <li>sausuge</li>
            <li>sausuge</li>
            <li>sausuge</li>
            <li>sausuge</li>
          </ul>
        </div>
        <div className="detail-procedure">
          <h3>procedure:</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
}
