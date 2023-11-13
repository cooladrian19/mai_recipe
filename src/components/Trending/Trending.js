import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./style.css";

// mock images
import breakfast from "../../assets/mock/breakfast.jpg";
import lunch from "../../assets/mock/lunch.jpg";
import dinner from "../../assets/mock/dinner.jpg";
import dessert from "../../assets/mock/dessert.jpg";
import healthy from "../../assets/mock/healthy.jpg";
import beverages from "../../assets/mock/beverages.jpg";
import BreakfastBackdrop from "../../assets/mock/breakfast-backdrop.jpg";
import LunchBackdrop from "../../assets/mock/lunch-backdrop.jpg";
import DinnerBackdrop from "../../assets/mock/dinner-backdrop.jpg";
import DessertBackdrop from "../../assets/mock/dessert-backdrop.jpg";
import HealthyBackdrop from "../../assets/mock/healthy-backdrop.jpg";
import BeveragesBackdrop from "../../assets/mock/beverages-backdrop.jpg";
import { Link } from "react-router-dom";

export default function Trending() {


  const quick = [
    {
      title: "Breakfast",
      image: breakfast,
      backdrop: BreakfastBackdrop,
      caption: "Rise and shine with breakfasts that'll make you hop out of bed with a smile!", 
    },
    {
      title: "Lunch",
      image: lunch,
      backdrop: LunchBackdrop,
      caption: "Lunch is a peek of sunshine in the middle of the day, and we've got your ray of culinary delight ready!", 
    },
    {
      title: "Dinner",
      image: dinner,
      backdrop: DinnerBackdrop,
      caption: "Skip the nightly dilemma with our handpicked selection of 5-star dinner recipes that are sure to become household favorites.", 
    },
    {
      title: "Dessert",
      image: dessert,
      backdrop: DessertBackdrop,
      caption: "Life is short, eat dessert first! Treat yourself to a sprinkle of joy with some of these sweet sensations.", 
    },
    {
      title: "Healthy",
      image: healthy,
      backdrop: HealthyBackdrop,
      caption: "Embrace wellness with our healthy eats, designed to be as nourishing as they are delicious.", 
    },
    {
      title: "Beverages",
      image: beverages,
      backdrop: BeveragesBackdrop,
      caption: "Clink and sip your way to refreshment with our dazzling array of beverages, each a toast to your day!", 
    },
  ];

  return (
    <div className="trending-container">
      <div className="splide-container">
        <span className="trend-title  ">Quick Recipes</span>
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
                height: 290,
                focus: "center",
                autoWidth: true,
              },
            },
          }}
        >
          {quick.map((recipe, index) => (
            <SplideSlide key={index}>
              <Link
                to={`/quickRecipe/${recipe.title}?image=${encodeURIComponent(
                  recipe.backdrop
                )}&caption=${encodeURIComponent(recipe.caption)}`}
                className="trend-card"
              >
                <div className="trend-card-img">
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <div className="trend-card-details">
                  <p>{recipe.title}</p>
                </div>
              </Link>
            </SplideSlide>
          ))}
        </Splide>

      </div>
    </div>
  );
}
