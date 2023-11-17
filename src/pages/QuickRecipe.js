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
  const [loading, setLoading] = useState(false);
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const image = queryParams.get("image");
  const caption = queryParams.get("caption");

  useEffect(() => {
    const fetchQuickRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.edamam.com/search?q=${category}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&time=1%2B&to=100`
        );
        const data = await response.json();
        setRecipes(data.hits);
        console.log(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }

      
    };

    fetchQuickRecipes();
  }, [category]);

  const splideQuickSettings = {
    perPage: 4,
    focus: 0,
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

  return (
    <div className="footer-margin">
      <NavBar />
      <div className="quick-container">
        <div className="quick-header">
          <div className="quick-background">
            <img src={image} alt="" />
          </div>
          <div className="quick-head">
            <span>{category} Recipes</span>
            <p> {caption} </p>
          </div>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="quick-body">
            <div className="quick-sections">
              <legend>{category} recipes with less than 500 calories</legend>
              <Splide options={splideQuickSettings}>
                {recipes.map((recipe, index) => {
                  if (recipe.recipe.calories < 500) {
                    return (
                      <SplideSlide key={index}>
                        <MiniRecipes recipe={recipe} />
                      </SplideSlide>
                    );
                  }
                  return null;
                })}
              </Splide>
            </div>
            <div className="quick-sections">
              <legend>{category} recipes with more than 500 calories</legend>
              <Splide options={splideQuickSettings}>
                {recipes.map((recipe, index) => {
                  if (recipe.recipe.calories > 500) {
                    return (
                      <SplideSlide key={index}>
                        <MiniRecipes recipe={recipe} />
                      </SplideSlide>
                    );
                  }
                  return null;
                })}
              </Splide>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
