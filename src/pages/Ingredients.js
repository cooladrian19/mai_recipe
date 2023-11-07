import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import "./Ingredients.css";
import SideImg from "../assets/cooking.png";
import Recipes from "../components/Recipes/Recipes";

export default function Ingredients() {
  const [recipes, setRecipes] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [fetchRecipes, setFetchRecipes] = useState(false);
  const [recipesFetched, setRecipesFetched] = useState(false);
  const [ingredientHash, setIngredientHash] = useState({});
  const [includeCommonIngredients, setIncludeCommonIngredients] = useState(false);


  // Initialize ingredient hash when selectedIngredients change
  useEffect(() => {
    const hash = {};
    selectedIngredients.forEach((ingredient) => {
      const normalizedIngredient = ingredient.toLowerCase().replace(/-/g, ' ' ).trim();
      hash[normalizedIngredient] = true;
    });
    setIngredientHash(hash);
  }, [selectedIngredients]);


  // Run API function only when fetchRecipes is true
  useEffect(() => {
    if (fetchRecipes && selectedIngredients.length > 0) {
      fetchEdamamRecipesByIngredient(selectedIngredients);
      setFetchRecipes(false);
    }
  }, [fetchRecipes, selectedIngredients]);


  useEffect(() => {
    if (includeCommonIngredients) {
      // Add common ingredients to the list if they're not already included
      const updatedIngredients = [...new Set([...selectedIngredients, ...commonIngredients])];
      setSelectedIngredients(updatedIngredients);
    } else {
      // Remove common ingredients from the list if they are included
      const filteredIngredients = selectedIngredients.filter(ingredient => !commonIngredients.includes(ingredient));
      setSelectedIngredients(filteredIngredients);
    }
  }, [includeCommonIngredients]);
  
  // Make sure to reset the common ingredients when the selectedIngredients change manually
  useEffect(() => {
    if (!selectedIngredients.some(ingredient => commonIngredients.includes(ingredient))) {
      setIncludeCommonIngredients(false);
    }
  }, [selectedIngredients]);


  const APP_ID = "3b7d48b2";
  const APP_KEY = "62689d9882d65ab7e7833e831da0f798";
  const fetchEdamamRecipesByIngredient = async (ingredients) => {

    const firstIngredient = ingredients[0];
    const apiUrl = `https://api.edamam.com/search?q=${firstIngredient}&app_id=${APP_ID}&app_key=${APP_KEY}&to=25`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setRecipes(data.hits);
      setRecipesFetched(true);
    } catch (error) {
      console.error("Error fetching recipes from Edamam: ", error);
    }
  };

  const isRecipeMatching = (recipeIngredients) => {
    if (!Array.isArray(recipeIngredients)) {
      console.error("recipeIngredients is not an array", recipeIngredients);
      return false;
    }

    // Log the recipe ingredients to see if they are in the expected format
    console.log("Checking recipe with ingredients:", recipeIngredients);

    return recipeIngredients.every((ingredientObj) => {
      const normalizedIngredient = ingredientObj.food.toLowerCase().replace(/-/g, ' ' ).trim();
      const ingredientExists = ingredientHash[normalizedIngredient];
      if (!ingredientExists) {
        console.log(`Ingredient not found: ${ingredientObj.food}`);
      }
      else {
        console.log(`Ingredientsss  found: ${ingredientObj.food}`);
      }
      return ingredientExists;
    });
  };

  // Function to update selected ingredients
  const handleIngredientSelection = (e) => {
    const ingredient = e.target.value;
    const isCategory = ingredient in ingredientCategoryMap;
  
    if (e.target.checked) {
      let newIngredients;
      if (isCategory) {
        // Add all specific ingredients for the category
        newIngredients = [...selectedIngredients, ...ingredientCategoryMap[ingredient]];
      } else {
        // Add just this specific ingredient
        newIngredients = [...selectedIngredients, ingredient];
      }
      setSelectedIngredients(Array.from(new Set(newIngredients))); // Use Set to remove duplicates
    } else {
      if (isCategory) {
        // Remove all specific ingredients for the category
        setSelectedIngredients(selectedIngredients.filter(item => !ingredientCategoryMap[ingredient].includes(item)));
      } else {
        // Remove just this specific ingredient
        setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
      }
    }
  };

  // Function to trigger the search
  const performIngredientSearch = (e) => {
    setFetchRecipes(true);
    console.log("Selected Ingredients:", selectedIngredients);
    e.preventDefault();
  };

  const commonIngredients = ['black pepper', 'white pepper', 'water', 'butter', 'chicken seasoning', 'beef seasoning', 'salt', 'sugar'];

  const ingredientCategoryMap = {
    oil: ['olive oil', 'extra virgin olive oil', 'vegetable oil'],
    chicken: ['chicken wings', 'chicken breasts', 'chicken legs'],

  };
  


  return (
    <div className="footer-margin">
      <Navbar />

      <div className="search-tip">
        <p className="tip-text">
          welcome to mai's recipe. need something new to cook? i have you
          covered!
        </p>
      </div>

      <div className="ingredient-body">
        <form className="tab-container">
          <span>select your ingredients</span>
          
          <div class="tabs">
            <input type="radio" name="tabs" id="tabone" />
            <label htmlFor="tabone">Protien</label>
            <div class="tab">
              <ul class="ks-cboxtags">
              <li>
                  <input
                    id="beef"
                    type="checkbox"
                    value="beef"
                    onChange={handleIngredientSelection}
                  />
                  <label for="beef">Beef</label>
                </li>
                <li>
                  <input
                    id="chicken"
                    type="checkbox"
                    value="chicken"
                    onChange={handleIngredientSelection}
                  />
                  <label for="chickem">chicken</label>
                </li>
                <li>
                  <input
                    id="ground beef"
                    type="checkbox"
                    value="ground beef"
                    onChange={handleIngredientSelection}
                  />
                  <label for="ground beef">Ground Beef</label>
                </li>
                <li>
                  <input
                    id="pork"
                    type="checkbox"
                    value="pork"
                    onChange={handleIngredientSelection}
                  />
                  <label for="pork">Pork</label>
                </li>
                <li>
                  <input
                    id="steak"
                    type="checkbox"
                    value="steak"
                    onChange={handleIngredientSelection}
                  />
                  <label for="steak">Steak</label>
                </li>
                <li>
                  <input
                    id="duck"
                    type="checkbox"
                    value="duck"
                    onChange={handleIngredientSelection}
                  />
                  <label for="duck">Duck</label>
                </li>    
                <li>
                  <input
                    id="lamb"
                    type="checkbox"
                    value="lamb"
                    onChange={handleIngredientSelection}
                  />
                  <label for="lamb">Lamb</label>
                </li>
                <li>
                  <input
                    id="fish"
                    type="checkbox"
                    value="fish"
                    onChange={handleIngredientSelection}
                  />
                  <label for="fish">Fish</label>
                </li>
                <li>
                  <input
                    id="shrimp"
                    type="checkbox"
                    value="shrimp"
                    onChange={handleIngredientSelection}
                  />
                  <label for="shrimp">Shrimp</label>
                </li>
                <li>
                  <input
                    id="salmon"
                    type="checkbox"
                    value="salmon"
                    onChange={handleIngredientSelection}
                  />
                  <label for="salmon">Salmon</label>
                </li>
                <li>
                  <input
                    id="tuna"
                    type="checkbox"
                    value="tuna"
                    onChange={handleIngredientSelection}
                  />
                  <label for="tuna">Tuna</label>
                </li>
                <li>
                  <input
                    id="cod"
                    type="checkbox"
                    value="cod"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cod">Cod</label>
                </li>
                <li>
                  <input
                    id="halibut"
                    type="checkbox"
                    value="halibut"
                    onChange={handleIngredientSelection}
                  />
                  <label for="halibut">Halibut</label>
                </li>
                <li>
                  <input
                    id="trout"
                    type="checkbox"
                    value="trout"
                    onChange={handleIngredientSelection}
                  />
                  <label for="trout">Trout</label>
                </li>
                <li>
                  <input
                    id="crab"
                    type="checkbox"
                    value="crab"
                    onChange={handleIngredientSelection}
                  />
                  <label for="crab">Crab</label>
                </li>
                <li>
                  <input
                    id="lobster"
                    type="checkbox"
                    value="lobster"
                    onChange={handleIngredientSelection}
                  />
                  <label for="lobster">Lobster</label>
                </li>
                <li>
                  <input
                    id="scallops"
                    type="checkbox"
                    value="scallops"
                    onChange={handleIngredientSelection}
                  />
                  <label for="scallops">Scallops</label>
                </li>
                <li>
                  <input
                    id="clams"
                    type="checkbox"
                    value="clams"
                    onChange={handleIngredientSelection}
                  />
                  <label for="clams">Clams</label>
                </li>
                <li>
                  <input
                    id="mussels"
                    type="checkbox"
                    value="mussels"
                    onChange={handleIngredientSelection}
                  />
                  <label for="mussels">Mussels</label>
                </li>
                <li>
                  <input
                    id="tofu"
                    type="checkbox"
                    value="tofu"
                    onChange={handleIngredientSelection}
                  />
                  <label for="tofu">Tofu</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabtwo" />
            <label htmlFor="tabtwo">Vegetables</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="tomato"
                    type="checkbox"
                    value="tomato"
                    onChange={handleIngredientSelection}
                  />
                  <label for="tomato">Tomato</label>
                </li>
                <li>
                  <input
                    id="onion"
                    type="checkbox"
                    value="onion"
                    onChange={handleIngredientSelection}
                  />
                  <label for="onion">Onion</label>
                </li>
                <li>
                  <input
                    id="carrot"
                    type="checkbox"
                    value="carrot"
                    onChange={handleIngredientSelection}
                  />
                  <label for="carrot">Carrot</label>
                </li>
                <li>
                  <input
                    id="broccoli"
                    type="checkbox"
                    value="broccoli"
                    onChange={handleIngredientSelection}
                  />
                  <label for="broccoli">Broccoli</label>
                </li>
                <li>
                  <input
                    id="spinach"
                    type="checkbox"
                    value="spinach"
                    onChange={handleIngredientSelection}
                  />
                  <label for="spinach">Spinach</label>
                </li>
                <li>
                  <input
                    id="zucchini"
                    type="checkbox"
                    value="zucchini"
                    onChange={handleIngredientSelection}
                  />
                  <label for="zucchini">Zucchini</label>
                </li>
                <li>
                  <input
                    id="bellpepper"
                    type="checkbox"
                    value="bellpepper"
                    onChange={handleIngredientSelection}
                  />
                  <label for="bellpepper">Bell Pepper</label>
                </li>
                <li>
                  <input
                    id="asparagus"
                    type="checkbox"
                    value="asparagus"
                    onChange={handleIngredientSelection}
                  />
                  <label for="asparagus">Asparagus</label>
                </li>
                <li>
                  <input
                    id="cabbage"
                    type="checkbox"
                    value="cabbage"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cabbage">Cabbage</label>
                </li>
                <li>
                  <input
                    id="cucumber"
                    type="checkbox"
                    value="cucumber"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cucumber">Cucumber</label>
                </li>
                <li>
                  <input
                    id="potato"
                    type="checkbox"
                    value="potato"
                    onChange={handleIngredientSelection}
                  />
                  <label for="potato">Potato</label>
                </li>
                <li>
                  <input
                    id="lettuce"
                    type="checkbox"
                    value="lettuce"
                    onChange={handleIngredientSelection}
                  />
                  <label for="lettuce">Lettuce</label>
                </li>
                <li>
                  <input
                    id="celery"
                    type="checkbox"
                    value="celery"
                    onChange={handleIngredientSelection}
                  />
                  <label for="celery">Celery</label>
                </li>
                <li>
                  <input
                    id="peas"
                    type="checkbox"
                    value="peas"
                    onChange={handleIngredientSelection}
                  />
                  <label for="peas">Peas</label>
                </li>
                <li>
                  <input
                    id="mushrooms"
                    type="checkbox"
                    value="mushrooms"
                    onChange={handleIngredientSelection}
                  />
                  <label for="mushrooms">Mushrooms</label>
                </li>
                <li>
                  <input
                    id="cauliflower"
                    type="checkbox"
                    value="cauliflower"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cauliflower">Cauliflower</label>
                </li>
                <li>
                  <input
                    id="green-beans"
                    type="checkbox"
                    value="green-beans"
                    onChange={handleIngredientSelection}
                  />
                  <label for="green-beans">Green Beans</label>
                </li>
                <li>
                  <input
                    id="sweet-potato"
                    type="checkbox"
                    value="sweet-potato"
                    onChange={handleIngredientSelection}
                  />
                  <label for="sweet-potato">Sweet Potato</label>
                </li>
                <li>
                  <input
                    id="kale"
                    type="checkbox"
                    value="kale"
                    onChange={handleIngredientSelection}
                  />
                  <label for="kale">Kale</label>
                </li>
                <li>
                  <input
                    id="eggplant"
                    type="checkbox"
                    value="eggplant"
                    onChange={handleIngredientSelection}
                  />
                  <label for="eggplant">Eggplant</label>
                </li>
                <li>
                  <input
                    id="radish"
                    type="checkbox"
                    value="radish"
                    onChange={handleIngredientSelection}
                  />
                  <label for="radish">Radish</label>
                </li>
                <li>
                  <input
                    id="beets"
                    type="checkbox"
                    value="beets"
                    onChange={handleIngredientSelection}
                  />
                  <label for="beets">Beets</label>
                </li>
                <li>
                  <input
                    id="corn"
                    type="checkbox"
                    value="corn"
                    onChange={handleIngredientSelection}
                  />
                  <label for="corn">Corn</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabthree" />
            <label htmlFor="tabthree">Fruits</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="Banana"
                    type="checkbox"
                    value="banana"
                    onChange={handleIngredientSelection}
                  />
                  <label for="banana">Banana</label>
                </li>
                <li>
                  <input
                    id="apples"
                    type="checkbox"
                    value="apples"
                    onChange={handleIngredientSelection}
                  />
                  <label for="apples">Apples</label>
                </li>
                <li>
                  <input
                    id="orange"
                    type="checkbox"
                    value="orange"
                    onChange={handleIngredientSelection}
                  />
                  <label for="orange">Orange</label>
                </li>
                <li>
                  <input
                    id="strawberries"
                    type="checkbox"
                    value="strawberries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="strawberries">Strawberries</label>
                </li>
                <li>
                  <input
                    id="blueberries"
                    type="checkbox"
                    value="blueberries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="blueberries">Blueberries</label>
                </li>
                <li>
                  <input
                    id="raspberries"
                    type="checkbox"
                    value="raspberries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="raspberries">Raspberries</label>
                </li>
                <li>
                  <input
                    id="blackberries"
                    type="checkbox"
                    value="blackberries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="blackberries">Blackberries</label>
                </li>
                <li>
                  <input
                    id="cranberries"
                    type="checkbox"
                    value="cranberries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cranberries">Cranberries</label>
                </li>
                <li>
                  <input
                    id="mango"
                    type="checkbox"
                    value="mango"
                    onChange={handleIngredientSelection}
                  />
                  <label for="mango">Mango</label>
                </li>
                <li>
                  <input
                    id="pineapple"
                    type="checkbox"
                    value="pineapple"
                    onChange={handleIngredientSelection}
                  />
                  <label for="pineapple">Pineapple</label>
                </li>
                <li>
                  <input
                    id="lime"
                    type="checkbox"
                    value="lime"
                    onChange={handleIngredientSelection}
                  />
                  <label for="lime">Lime</label>
                </li>
                <li>
                  <input
                    id="kiwi"
                    type="checkbox"
                    value="kiwi"
                    onChange={handleIngredientSelection}
                  />
                  <label for="kiwi">Kiwi</label>
                </li>
                <li>
                  <input
                    id="watermelon"
                    type="checkbox"
                    value="watermelon"
                    onChange={handleIngredientSelection}
                  />
                  <label for="watermelon">Watermelon</label>
                </li>
                <li>
                  <input
                    id="grapes"
                    type="checkbox"
                    value="grapes"
                    onChange={handleIngredientSelection}
                  />
                  <label for="grapes">Grapes</label>
                </li>
                <li>
                  <input
                    id="peaches"
                    type="checkbox"
                    value="peaches"
                    onChange={handleIngredientSelection}
                  />
                  <label for="peaches">Peaches</label>
                </li>
                <li>
                  <input
                    id="pear"
                    type="checkbox"
                    value="pear"
                    onChange={handleIngredientSelection}
                  />
                  <label for="pear">Pear</label>
                </li>
                <li>
                  <input
                    id="apricots"
                    type="checkbox"
                    value="apricots"
                    onChange={handleIngredientSelection}
                  />
                  <label for="apricots">Apricots</label>
                </li>
                <li>
                  <input
                    id="plums"
                    type="checkbox"
                    value="plums"
                    onChange={handleIngredientSelection}
                  />
                  <label for="plums">Plums</label>
                </li>
                <li>
                  <input
                    id="nectarine"
                    type="checkbox"
                    value="nectarine"
                    onChange={handleIngredientSelection}
                  />
                  <label for="nectarine">Nectarine</label>
                </li>
                <li>
                  <input
                    id="grapefruit"
                    type="checkbox"
                    value="grapefruit"
                    onChange={handleIngredientSelection}
                  />
                  <label for="grapefruit">Grapefruit</label>
                </li>
                <li>
                  <input
                    id="cherries"
                    type="checkbox"
                    value="cherries"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cherries">Cherries</label>
                </li>
                <li>
                  <input
                    id="pomegranate"
                    type="checkbox"
                    value="pomegranate"
                    onChange={handleIngredientSelection}
                  />
                  <label for="pomegranate">Pomegranate</label>
                </li>
                <li>
                  <input
                    id="guava"
                    type="checkbox"
                    value="guava"
                    onChange={handleIngredientSelection}
                  />
                  <label for="guava">Guava</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabfour" />
            <label htmlFor="tabfour">Dairy</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="Egg"
                    type="checkbox"
                    value="egg"
                    onChange={handleIngredientSelection}
                  />
                  <label for="egg">Eggs</label>
                </li>
                <li>
                  <input
                    id="milk"
                    type="checkbox"
                    value="milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="milk">Milk</label>
                </li>
                <li>
                  <input
                    id="cheese"
                    type="checkbox"
                    value="cheese"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cheese">Cheese</label>
                </li>
                <li>
                  <input
                    id="yogurt"
                    type="checkbox"
                    value="yogurt"
                    onChange={handleIngredientSelection}
                  />
                  <label for="yogurt">Yogurt</label>
                </li>
                <li>
                  <input
                    id="butter"
                    type="checkbox"
                    value="butter"
                    onChange={handleIngredientSelection}
                  />
                  <label for="butter">Butter</label>
                </li>
                <li>
                  <input
                    id="cream"
                    type="checkbox"
                    value="cream"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cream">Cream</label>
                </li>
                <li>
                  <input
                    id="cottage-cheese"
                    type="checkbox"
                    value="cottage-cheese"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cottage-cheese">Cottage Cheese</label>
                </li>
                <li>
                  <input
                    id="sour-cream"
                    type="checkbox"
                    value="sour-cream"
                    onChange={handleIngredientSelection}
                  />
                  <label for="sour-cream">Sour Cream</label>
                </li>
                <li>
                  <input
                    id="whipped-cream"
                    type="checkbox"
                    value="whipped-cream"
                    onChange={handleIngredientSelection}
                  />
                  <label for="whipped-cream">Whipped Cream</label>
                </li>
                <li>
                  <input
                    id="ice-cream"
                    type="checkbox"
                    value="ice-cream"
                    onChange={handleIngredientSelection}
                  />
                  <label for="ice-cream">Ice Cream</label>
                </li>
                <li>
                  <input
                    id="evaporated-milk"
                    type="checkbox"
                    value="evaporated-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="evaporated-milk">Evaporated Milk</label>
                </li>
                <li>
                  <input
                    id="condensed-milk"
                    type="checkbox"
                    value="condensed-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="condensed-milk">Condensed Milk</label>
                </li>
                <li>
                  <input
                    id="buttermilk"
                    type="checkbox"
                    value="buttermilk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="buttermilk">Buttermilk</label>
                </li>
                <li>
                  <input
                    id="goat-milk"
                    type="checkbox"
                    value="goat-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="goat-milk">Goat Milk</label>
                </li>
                <li>
                  <input
                    id="almond-milk"
                    type="checkbox"
                    value="almond-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="almond-milk">Almond Milk</label>
                </li>
                <li>
                  <input
                    id="soy-milk"
                    type="checkbox"
                    value="soy-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="soy-milk">Soy Milk</label>
                </li>
                <li>
                  <input
                    id="oat-milk"
                    type="checkbox"
                    value="oat-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="oat-milk">Oat Milk</label>
                </li>
                <li>
                  <input
                    id="rice-milk"
                    type="checkbox"
                    value="rice-milk"
                    onChange={handleIngredientSelection}
                  />
                  <label for="rice-milk">Rice Milk</label>
                </li>
                <li>
                  <input
                    id="maple-syrup"
                    type="checkbox"
                    value="maple-syrup"
                    onChange={handleIngredientSelection}
                  />
                  <label for="maple-syrup">Maple Syrup</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabfive" />
            <label htmlFor="tabfive">Grains & Cereal</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="rice"
                    type="checkbox"
                    value="rice"
                    onChange={handleIngredientSelection}
                  />
                  <label for="rice">Rice</label>
                </li>
                <li>
                  <input
                    id="quinoa"
                    type="checkbox"
                    value="quinoa"
                    onChange={handleIngredientSelection}
                  />
                  <label for="quinoa">Quinoa</label>
                </li>
                <li>
                  <input
                    id="oats"
                    type="checkbox"
                    value="oats"
                    onChange={handleIngredientSelection}
                  />
                  <label for="oats">Oats</label>
                </li>
                <li>
                  <input
                    id="pasta"
                    type="checkbox"
                    value="pasta"
                    onChange={handleIngredientSelection}
                  />
                  <label for="pasta">Pasta</label>
                </li>
                <li>
                  <input
                    id="cereal"
                    type="checkbox"
                    value="cereal"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cereal">Cereal</label>
                </li>
                <li>
                  <input
                    id="rye"
                    type="checkbox"
                    value="rye"
                    onChange={handleIngredientSelection}
                  />
                  <label for="rye">Rye</label>
                </li>
                <li>
                  <input
                    id="wheat"
                    type="checkbox"
                    value="wheat"
                    onChange={handleIngredientSelection}
                  />
                  <label for="wheat">Wheat</label>
                </li>
                <li>
                  <input
                    id="cornmeal"
                    type="checkbox"
                    value="cornmeal"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cornmeal">Cornmeal</label>
                </li>
                <li>
                  <input
                    id="rice-noodles"
                    type="checkbox"
                    value="rice-noodles"
                    onChange={handleIngredientSelection}
                  />
                  <label for="rice-noodles">Rice Noodles</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabsix" />
            <label htmlFor="tabsix">Baking Supplies</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="flour"
                    type="checkbox"
                    value="flour"
                    onChange={handleIngredientSelection}
                  />
                  <label for="flour">Flour</label>
                </li>
                <li>
                  <input
                    id="sugar"
                    type="checkbox"
                    value="sugar"
                    onChange={handleIngredientSelection}
                  />
                  <label for="sugar">Sugar</label>
                </li>
                <li>
                  <input
                    id="brown-sugar"
                    type="checkbox"
                    value="brown-sugar"
                    onChange={handleIngredientSelection}
                  />
                  <label for="brown-sugar">Brown Sugar</label>
                </li>
                <li>
                  <input
                    id="granulated-sugar"
                    type="checkbox"
                    value="granulated-sugar"
                    onChange={handleIngredientSelection}
                  />
                  <label for="granulated-sugar">Granulated Sugar</label>
                </li>
                <li>
                  <input
                    id="honey"
                    type="checkbox"
                    value="honey"
                    onChange={handleIngredientSelection}
                  />
                  <label for="honey">Honey</label>
                </li>
                <li>
                  <input
                    id="corn-syrup"
                    type="checkbox"
                    value="corn-syrup"
                    onChange={handleIngredientSelection}
                  />
                  <label for="corn-syrup">Corn Syrup</label>
                </li>
                <li>
                  <input
                    id="baking-powder"
                    type="checkbox"
                    value="baking-powder"
                    onChange={handleIngredientSelection}
                  />
                  <label for="baking-powder">Baking Powder</label>
                </li>
                <li>
                  <input
                    id="baking-soda"
                    type="checkbox"
                    value="baking-soda"
                    onChange={handleIngredientSelection}
                  />
                  <label for="baking-soda">Baking Soda</label>
                </li>
                <li>
                  <input
                    id="yeast"
                    type="checkbox"
                    value="yeast"
                    onChange={handleIngredientSelection}
                  />
                  <label for="yeast">Yeast</label>
                </li>
                <li>
                  <input
                    id="vanilla-extract"
                    type="checkbox"
                    value="vanilla-extract"
                    onChange={handleIngredientSelection}
                  />
                  <label for="vanilla-extract">Vanilla Extract</label>
                </li>
                <li>
                  <input
                    id="cocoa-powder"
                    type="checkbox"
                    value="cocoa-powder"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cocoa-powder">Cocoa Powder</label>
                </li>
                <li>
                  <input
                    id="chocolate-chips"
                    type="checkbox"
                    value="chocolate-chips"
                    onChange={handleIngredientSelection}
                  />
                  <label for="chocolate-chips">Chocolate Chips</label>
                </li>
                <li>
                  <input
                    id="cornstarch"
                    type="checkbox"
                    value="cornstarch"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cornstarch">Cornstarch</label>
                </li>
                <li>
                  <input
                    id="bread-crumbs"
                    type="checkbox"
                    value="bread-crumbs"
                    onChange={handleIngredientSelection}
                  />
                  <label for="bread-crumbs">Bread Crumbs</label>
                </li>
                <li>
                  <input
                    id="Walnuts"
                    type="checkbox"
                    value="walnuts"
                    onChange={handleIngredientSelection}
                  />
                  <label for="walnuts">Walnuts</label>
                </li>
              </ul>
            </div>

            <input type="radio" name="tabs" id="tabseven" />
            <label htmlFor="tabseven">Spices</label>
            <div class="tab">
              <ul class="ks-cboxtags">
                <li>
                  <input
                    id="salt"
                    type="checkbox"
                    value="salt"
                    onChange={handleIngredientSelection}
                  />
                  <label for="salt">Salt</label>
                </li>
                <li>
                  <input
                    id="black pepper"
                    type="checkbox"
                    value="black pepper"
                    onChange={handleIngredientSelection}
                  />
                  <label for="black pepper">black pepper</label>
                </li>
                <li>
                  <input
                    id="garlic-powder"
                    type="checkbox"
                    value="garlic-powder"
                    onChange={handleIngredientSelection}
                  />
                  <label for="garlic-powder">Garlic Powder</label>
                </li>
                <li>
                  <input
                    id="onion-powder"
                    type="checkbox"
                    value="onion-powder"
                    onChange={handleIngredientSelection}
                  />
                  <label for="onion-powder">Onion Powder</label>
                </li>
                <li>
                  <input
                    id="cayenne pepper"
                    type="checkbox"
                    value="cayenne pepper"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cayenne pepper">Cayenne Pepper</label>
                </li>
                <li>
                  <input
                    id="paprika"
                    type="checkbox"
                    value="paprika"
                    onChange={handleIngredientSelection}
                  />
                  <label for="paprika">Paprika</label>
                </li>
                <li>
                  <input
                    id="cumin"
                    type="checkbox"
                    value="cumin"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cumin">Cumin</label>
                </li>
                <li>
                  <input
                    id="cinnamon"
                    type="checkbox"
                    value="cinnamon"
                    onChange={handleIngredientSelection}
                  />
                  <label for="cinnamon">Cinnamon</label>
                </li>
                <li>
                  <input
                    id="mustard"
                    type="checkbox"
                    value="mustard"
                    onChange={handleIngredientSelection}
                  />
                  <label for="mustard">Mustard</label>
                </li>
                <li>
                  <input
                    id="ketchup"
                    type="checkbox"
                    value="ketchup"
                    onChange={handleIngredientSelection}
                  />
                  <label for="ketchup">Ketchup</label>
                </li>
                <li>
                  <input
                    id="mayonnaise"
                    type="checkbox"
                    value="mayonnaise"
                    onChange={handleIngredientSelection}
                  />
                  <label for="mayonnaise">Mayonnaise</label>
                </li>
                <li>
                  <input
                    id="vinegar"
                    type="checkbox"
                    value="vinegar"
                    onChange={handleIngredientSelection}
                  />
                  <label for="vinegar">Vinegar</label>
                </li>
                <li>
                  <input
                    id="soy-sauce"
                    type="checkbox"
                    value="soy-sauce"
                    onChange={handleIngredientSelection}
                  />
                  <label for="soy-sauce">Soy Sauce</label>
                </li>
                <li>
                  <input
                    id="fish-sauce"
                    type="checkbox"
                    value="fish-sauce"
                    onChange={handleIngredientSelection}
                  />
                  <label for="fish-sauce">Fish Sauce</label>
                </li>
                <li>
                  <input
                    id="oyster-sauce"
                    type="checkbox"
                    value="oyster-sauce"
                    onChange={handleIngredientSelection}
                  />
                  <label for="oyster-sauce">Oyster Sauce</label>
                </li>
                <li>
                  <input
                    id="sesame-oil"
                    type="checkbox"
                    value="sesame-oil"
                    onChange={handleIngredientSelection}
                  />
                  <label for="sesame-oil">Sesame Oil</label>
                </li>
                <li>
                  <input
                    id="olive-oil"
                    type="checkbox"
                    value="olive-oil"
                    onChange={handleIngredientSelection}
                  />
                  <label for="olive-oil">Olive Oil</label>
                </li>
                <li>
                  <input
                    id="broth"
                    type="checkbox"
                    value="broth"
                    onChange={handleIngredientSelection}
                  />
                  <label for="broth">Broth</label>
                </li>
              </ul>
            </div>
          </div>

          <button onClick={performIngredientSearch} className="search-recipe-button-ingredients">search</button>
            
          <div className="checkbox-wrapper-47">
              <input type="checkbox"  checked={includeCommonIngredients} onChange={() => setIncludeCommonIngredients(!includeCommonIngredients)} id="select-essential"/>
              <label for="select-essential">select essentials <p>selects all essential ingredients: salt, pepper, oil, etc. </p> </label>
            </div>
       
          
          
          <div className="search-instructions">
            <ol>
              <li>
                Click on the section tabs to switch between different ingredient
                categories. Each tab represents a specific group of ingredients.
              </li>
              <li>
                Within each section, you'll find a list of ingredients related
                to the chosen category. Check the checkbox ingredient you want
                to include in your selection.
              </li>
              <li>
                Once you've selected your desired ingredients, review your
                choices to ensure you've included everything you have.
              </li>
              <li>
                Finally, i'll display a list of all the wonderful recipes you
                can make with your selected ingredients.
              </li>
            </ol>
          </div>
        </form>

        {/* Display recipes here */}
        <div className="recipes-wrapper">
          <ul className="recipes-container">
            {recipesFetched && recipes.length === 0 ? (
              <p>No recipes found. Try a different search.</p>
            ) : (
              recipes.map((recipe, index) => {
                const isMatching = isRecipeMatching(recipe.recipe.ingredients);
                console.log(`Recipe ${recipe.recipe.label} is matching:`, isMatching);
                if (isMatching) {
                  return (
                    <Recipes
                      id={recipe.recipe.label}
                      image={recipe.recipe.image}
                      title={recipe.recipe.label}
                      calories={Math.floor(recipe.recipe.calories)}
                      ingredients={recipe.recipe.ingredients}
                      type={recipe.recipe.mealType}
                      time={recipe.recipe.totalTime}
                    />
                  );
                }
                return null;
              })
            )}
          </ul>
        </div>

        {/* image side*/}
        <div className="side-container">
          <div className="side-img-container">
            <img src={SideImg}></img>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
