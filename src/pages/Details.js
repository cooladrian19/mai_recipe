import React, { useEffect, useState } from "react";
import "./Details.css";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue, remove, off } from "firebase/database";

export default function Details() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const [isFavorited, setIsFavorited] = useState(false);
  


  const handleFavorite = (e) => {
    if (!user) {
      e.preventDefault();
      e.target.checked = false;
      alert("Please log in to save favorites!");
      return;
    }

    const checked = e.target.checked;
    setIsFavorited(checked);
    const favoritesRef = ref(db, `users/${user.uid}/favorites`);

    onValue(
      favoritesRef,
      (snapshot) => {
        let alreadyFavorite = false;
        let favoriteKey;
        snapshot.forEach((childSnapshot) => {
          const favorite = childSnapshot.val();
          if (favorite.recipeId === id) {
            alreadyFavorite = true;
            favoriteKey = childSnapshot.key;
          }
        });

        if (checked && !alreadyFavorite) {
          push(favoritesRef, {
            recipeId: id,
          });
        } else if (!checked && alreadyFavorite) {
          remove(ref(db, `users/${user.uid}/favorites/${favoriteKey}`));
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const APP_ID = "3b7d48b2";
        const APP_KEY = "62689d9882d65ab7e7833e831da0f798";
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

    const checkFavoriteStatus = () => {
      if (user) {
        const favoritesRef = ref(db, `users/${user.uid}/favorites`);
        onValue(
          favoritesRef,
          (snapshot) => {
            let isFavorite = false;
            snapshot.forEach((childSnapshot) => {
              const favorite = childSnapshot.val();
              if (favorite.recipeId === id) {
                isFavorite = true;
              }
            });
            setIsFavorited(isFavorite);
          },
          {
            onlyOnce: true,
          }
        );
      }
      
    };
    

    fetchRecipeDetails();
    checkFavoriteStatus();

    return () => {
      if (user) {
        const favoritesRef = ref(db, `users/${user.uid}/favorites`);
        off(favoritesRef);  
      }
    };

  }, [id, user, db]);

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
              <div className="specs-left">
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

              <div className="heart-recipe">
                <input
                  id="favorite-checkbox"
                  type="checkbox"
                  checked = {isFavorited}
                  onChange={handleFavorite}
                />
                <label htmlFor="favorite-checkbox">
                  <i class="fa-solid fa-heart"></i>
                </label>
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

          <div className="detail-url ">
            <a href={recipeDetails.url} target="_blank" className="hover-line">
              link to full recipe
            </a>
          </div>
        </div>

        {/* DETAIL BODY */}
      </div>

      <Footer />
    </div>
  );
}
