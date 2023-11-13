import React from "react";
import { useState, useEffect } from "react";
import "./style.css";
import Recipes from "../Recipes/Recipes";

export default function Search() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [fetchRecipes, setFetchRecipes] = useState(false);
  const [recipesFetched, setRecipesFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displayedRecipes, setDisplayedRecipes] = useState(15);
  

  useEffect(() => {
    if (fetchRecipes && query) {
      fetchEdamamRecipes();
      setFetchRecipes(false);
    }
  }, [fetchRecipes, query]);

  
  const fetchEdamamRecipes = async () => {
    setLoading(true); 
    setRecipesFetched(false);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&time=1%2B&to=100`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data);
    } catch (error) {
      console.error("Error fetching recipes from Edamam: ", error);
    } finally {
      setLoading(false); 
      setRecipesFetched(true); 
    }
  };

  const handleShowMore = () => {
    setDisplayedRecipes((prevDisplayedRecipes) => prevDisplayedRecipes + 15);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setFetchRecipes(true);
  };

  return (
    <div className="container">
      {/* SEARCH BY NAME */}
      <label htmlFor="searchRecipe" className="search-label">
        Search by Name
      </label>
      <form onSubmit={getSearch} className="search-container">
        <input
          type="search"
          className="search-recipe-input"
          placeholder="enter any type of food..."
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-recipe-button-home">
          search
        </button>
      </form>

      {/* LOADING INDICATOR */}
      {loading && <div className="loader"></div>}

      {/* DISPLAY RESULTS */}
      {!loading && recipesFetched && (
        <div className="results-count">
          <p>{recipes.length} results found</p>
        </div>
      )}

      {/* DISPLAY RECIPES */}
      {!loading && (
        <div className="recipes-wrapper">
          <div className="recipes-container">
          {recipesFetched && recipes.length === 0 ? (
              <p>No recipes found, try a different search.</p>
            ) : (
              recipes.slice(0, displayedRecipes).map((recipe) => ( 
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
          {displayedRecipes < recipes.length && (
              <button onClick={handleShowMore} className="show-more-button">
                Show me More
              </button>
            )}
        </div>


      )}
    </div>
  );
}
