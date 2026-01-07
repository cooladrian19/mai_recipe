import React, { useState, useEffect } from "react";
import MiniRecipes from "../MiniRecipes/MiniRecipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./style.css";

export default function SavedRecipes({ favoriteRecipes,  }) {
  const [favoriteRecipeDetails, setFavoriteRecipeDetails] = useState([]);

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      Promise.all(
        favoriteRecipes.map((recipeId) =>
          fetch(
            `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
          ).then((response) => response.json())
        )
      ).then((details) => {
        setFavoriteRecipeDetails(details.map((detail) => detail?.recipe).filter(Boolean));
      });
    }
  }, [favoriteRecipes]);

  const splideSavedSettings = {
    perPage: 4,
    arrows: true,
    height: 300,
    width: 1250,
    type: "loop",
    autoplay: true,
    gap: "1rem",
    wheel: true,
    breakpoints: {
      1343: {
        width: 900,
        perPage: 3,
      },
      940: {
        width: 700,
        focus: "center",
        autoWidth: true,
      },
      768: {
        width: 525,
        focus: "center",
        autoWidth: true,
      },
      570: {
        width: 370,
        focus: "center",
        autoWidth: true,
      },
    },
  };

  if (favoriteRecipes.length === 0) {
    return (
      <div className="saved-container">
        <span className="saved-header">saved recipes</span>
        <p className="no-recipes">You haven't saved any recipes yet. Start exploring and save your favorites!</p>
      </div>
    );
  }
  

  return (
    <div className="saved-container">
      <span className="saved-header">Saved Recipes</span>
      {favoriteRecipeDetails.length > 0 ? (
        <Splide options={splideSavedSettings}>
          {favoriteRecipeDetails.map((recipe, index) => (
            <SplideSlide key={index}>
              <MiniRecipes recipe={{ recipe }} />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
