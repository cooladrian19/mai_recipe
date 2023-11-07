import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import Recipes from "../Recipes/Recipes";
import Ingredients from "../../pages/Ingredients";

export default function Search() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [fetchRecipes, setFetchRecipes] = useState(false); // New state to control when to fetch recipes
  const [recipesFetched, setRecipesFetched] = useState(false); // New state to track if recipes have been fetched


  // Run API function only when fetchRecipes is true
  useEffect(() => {
    if (fetchRecipes && query) {
      fetchEdamamRecipes();
      setFetchRecipes(false); // Reset fetchRecipes after fetching
    }
  }, [fetchRecipes, query]);

  // Call the Edamam API
  const APP_ID = "3b7d48b2";
  const APP_KEY = "62689d9882d65ab7e7833e831da0f798";
  const fetchEdamamRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&time=1%2B&to=20`
      );
      const data = await response.json();
      setRecipes(data.hits);
      setRecipesFetched(true); // Recipes have been fetched
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes from Edamam: ", error);
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setFetchRecipes(true); // Set fetchRecipes to true when searching
   
  };


  return (
    <div className="container">
      {/* SEARCH BY NAME */}
      <label htmlFor="searchRecipe" className="search-label">
        search by name
      </label>
      <form onSubmit={getSearch} className="search-container">
        <input
          type="search"
          className="search-recipe-input"
          placeholder="enter any type of food..."
          value={search}
          onChange={updateSearch}
        ></input>
        <button type="submit" className="search-recipe-button">
          search
        </button>
      </form>

      {/* DISPLAY RESULTS */}
      <div className="results-count">
        {recipesFetched && <p>{recipes.length} results found</p>}
      </div>

      {/* DISPLAY RECIPES */}
      <div className="recipes-wrapper">
        <div className="recipes-container">
          {recipesFetched && recipes.length === 0 ? (
            <p>No recipes found. Try a different search.</p>
          ) : (
            recipes.map((recipe) => (
              <Recipes
                id={recipe.recipe.uri}
                image={recipe.recipe.image}
                title={recipe.recipe.label}
                calories={Math.floor(recipe.recipe.calories)}
                ingredients={recipe.recipe.ingredients}
                type={recipe.recipe.mealType}
                time={recipe.recipe.totalTime}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
