import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import Ingredients from "./pages/Ingredients";
import NoPage from "./pages/NoPage";
import QuickRecipe from "./pages/QuickRecipe";
import { AuthProvider } from "./contexts/AuthContext";



function App() {

  return (
      <div className="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/auth" element = {<Auth />} />
        <Route path="/profile" element = {<Profile />} />
        <Route path="/details/:id" element = {<Details />} />
        <Route path="/quickRecipe/:category" element = {<QuickRecipe />} />
        <Route path="/searchIngredients" element = {<Ingredients />} />
        <Route path="*" element = {<NoPage />} />
      </Routes>
      </BrowserRouter>
      
    </div>

    
  );
}

export default App;

