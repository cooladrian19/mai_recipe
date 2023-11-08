import React, { useEffect, useState } from "react";
import "./Details.css";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const APP_ID = "3b7d48b2";
        const APP_KEY = "62689d9882d65ab7e7833e831da0f798";
        // This is a mock URL, you need to replace with actual API call
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();
        console.log(data);
        if (data.recipe) {
          setRecipeDetails(data.recipe);
        } else {
          setRecipeDetails({});
        }
      } catch (error) {
        console.error("Failed to fetch recipe details", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="footer-margin">
      <Navbar />
      {/* DETAIL HEADER */}
      <div className="detail-wrapper">
        <div className="detail-container">
          <h2 className="detail-label">{recipeDetails.label}</h2>
          <div className="detail-top">
            <div className="detail-img">
              <img src={recipeDetails.image} alt={recipeDetails.label} />
            </div>

            <div className="detail-specs">
              <div className="detail-specs-contain">
                <p>{Math.round(recipeDetails.calories)}</p>
                <h3>calories</h3>
              </div>
              <div className="detail-specs-contain">
                <p>{recipeDetails.totalTime}</p>
                <h3>total time</h3>
              </div>
              <div className="detail-specs-contain">
                <p>{recipeDetails.yield}</p>
                <h3>servings</h3>
              </div>
            </div>
          </div>

          <div className="detail-type">
            <h3>dish type:</h3>
            <ul>
              {recipeDetails.dishType.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>

          <div className="detail-ingredients">
            <h3>ingredients</h3>
            <ul>
              {recipeDetails.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div className="detail-procedures">
            <h3>procedures</h3>
            <ol>
              <li>asdsadsadasd</li>
              <li>asdsadsadasd</li>
              <li>asdsadsadasd</li>
            </ol>
          </div>

          <div className="detail-url" >
            <a href={recipeDetails.url} target="_blank" className="hover-line">link to full recipe</a>
          </div>

        </div>

        {/* DETAIL BODY */}
      </div>

      <Footer />
    </div>
  );
}
