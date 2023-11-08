import React from "react";
import "./QuickRecipe.css";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import MiniRecipes from "../components/MiniRecipes/MiniRecipes";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function QuickRecipe() {
  const [recipes, setRecipes] = useState([]);
  const { category} = useParams();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const image = queryParams.get('image');

  useEffect(() => {
    // Define an async function to fetch recipes based on the category
    const fetchQuickRecipes = async () => {
      try {
        const APP_ID = "3b7d48b2";
        const APP_KEY = "62689d9882d65ab7e7833e831da0f798";
        const response = await fetch(
          `https://api.edamam.com/search?q=${category}&app_id=${APP_ID}&app_key=${APP_KEY}&time=1%2B&to=25`
        );
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    // Call the fetch function
    fetchQuickRecipes();
  }, [category]); // This will re-run whenever the category changes


  
  return (
    
    <div className="footer-margin">
      <NavBar />
      <div className="quick-container">
        <div className="quick-header">
            <div className="quick-background">
                <div className="quick-img-contain">
                    <img src={image} alt={`${category}`} />
                </div>
                
            </div>  
          <span>{category} Recipes</span>
        </div>

        <div className="quick-body">
          <div className="quick-sections">
            <legend>{category} recipes with less than 500 calories</legend>
            <Splide
            options={{
              perPage: 4,
              arrows: true,
              height: 350,
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
                  direction: "ttb",
                  width: "100%",
                  perPage: 2,
                  perMove: 1,
                  gap: "0rem",
                  height: "700px",
                },
                768: {
                  direction: "ttb",
                },
              },
            }}>
              {recipes.map((recipe, index) => {
                if (recipe.recipe.calories < 500) {
                  return (
                    <SplideSlide key={index}>
                      <MiniRecipes  recipe={recipe} />
                    </SplideSlide>
                  );
                }
                return null;
              })}
            </Splide>
          </div>
          <div className="quick-sections">
            <legend>{category} recipes with less more than 500 calories</legend>
            <Splide options={{
            perPage: 4,
            arrows: true,
            height: 350,
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
                direction: "ttb",
                width: "100%",
                perPage: 2,
                perMove: 1,
                gap: "0rem",
                height: "700px",
              },
              768: {
                direction: "ttb",
              },
            },
          }}>
              {recipes.map((recipe, index) => {
                if (recipe.recipe.calories > 500) {
                  return (
                    <SplideSlide key={index}>
                      <MiniRecipes  recipe={recipe} />
                    </SplideSlide>
                  );
                }
                return null;
              })}
            </Splide>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
