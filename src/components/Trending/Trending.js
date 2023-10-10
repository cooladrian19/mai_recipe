import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./style.css";

// mock images 
import mockImage1 from '../../assets/mock/mock-image-1.jpg';
import mockImage2 from '../../assets/mock/mock-image-2.jpg';
import mockImage3 from '../../assets/mock/mock-image-3.jpg';
import mockImage4 from '../../assets/mock/mock-image-4.jpg';
import mockImage5 from '../../assets/mock/mock-image-5.jpg';
import mockImage6 from '../../assets/mock/mock-image-6.jpg';



export default function Trending() {
  {
    /* 

  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending();
  }, []);

 
  const getTrending = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=4`
    );
    const data = await api.json();
    setTrending(data.recipes);
    console.log(data.recipes);
  };

*/
  }

  const mockTrending = [
    {
      title: "Mock Recipe 1",
      image: mockImage1,
    },
    {
      title: "Mock Recipe 2",
      image: mockImage2,
    },
    {
      title: "Mock Recipe 3",
      image: mockImage3,
      },
      {
      title: "Mock Recipe 4",
      image: mockImage4,
    },
    {
      title: "Mock Recipe 5",
      image: mockImage5,
    },
    {
      title: "Mock Recipe 6",
      image: mockImage6,
    },
  ];

  return (
    <div className="trending">
      <div className="trending-container">
        <h1 className="trend-title">Trending</h1>

        {/*
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            gap: "5rem",
          }}
        >
          {trending.map((recipe) => {
            return (
              <SplideSlide>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
        */}



  {/* mockkkkkkkkkk */}
        <Splide 
          options={{
            perPage: 4,
            arrows: false,
            gap: "4rem",
            
            breakpoints: {
              1024: {
                perPage: 3,
               
              },
              767: {
                perPage: 2,
            
              },
              640: {
                perPage: 1,
          
              },
            }
            
          }}
        >
          {mockTrending.map((recipe, index) => (
            <SplideSlide key={index}>
              <a className="trend-card" href="/">
                <div className="trend-card-img">
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <p>{recipe.title}</p>
              </a>
            </SplideSlide>
          ))}
        </Splide>

  {/* mockkkkkkkkkk */}

      </div>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  margin: 4rem 0rem;
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    object-fit: cover;
    left: 0;
    width: 100%;
    height: 100%;
  }

  p {
    display: flex;
    justify-content: center;
  }
`;
