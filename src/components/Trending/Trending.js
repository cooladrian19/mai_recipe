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
import { Link } from "react-router-dom";

export default function Trending() {
  {
  }

  const mockTrending = [
    {
      title: "breakfast",
      image: breakfast,
    },
    {
      title: "lunch",
      image: lunch,
    },
    {
      title: "dinner",
      image: dinner,
    },
    {
      title: "dessert",
      image: dessert,
    },
    {
      title: "healthy",
      image: healthy,
    },
    {
      title: "beverages",
      image: beverages,
    },
  ];

  return (
    <div className="trending-container">
      <div className="splide-container">
        <span className="trend-title  ">quick recipes</span>
        {/* mockkkkkkkkkk */}
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
          }}
        >
          {mockTrending.map((recipe, index) => (
            <SplideSlide key={index}>
              <Link
                to={`/quickRecipe/${recipe.title}?image=${encodeURIComponent(
                  recipe.image
                )}`}
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

        {/* mockkkkkkkkkk */}
      </div>
    </div>
  );
}
