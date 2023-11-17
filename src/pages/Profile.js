import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ProfileEdit from "../components/ProfileEdit/ProfileEdit";
import SavedRecipes from "../components/SavedRecipes/SavedRecipes";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";


export default function Profile() {

  const [favorites, setFavorites] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  useEffect(() => {
    if (!user) {
      alert("Please log in to view favorites!");
      return;
    }

    const favoritesRef = ref(db, `users/${user.uid}/favorites`);
    onValue(favoritesRef, (snapshot) => {
      const data = snapshot.val();
      const favoriteList = [];
      for (let key in data) {
        favoriteList.push(data[key].recipeId);
      }
      setFavorites(favoriteList);
    });
  }, [user]);


  return (
    <div className="footer-margin">
      <Navbar />
        
        <ProfileEdit />
        <SavedRecipes  favoriteRecipes={favorites}/>
        
      <Footer />
    </div>
  );
}
