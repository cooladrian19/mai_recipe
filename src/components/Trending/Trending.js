import { useEffect , useState} from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

export default function Trending() {

  const [trending ,setTrending] = useState([]);

  useEffect(() => {
    getTrending();
  }, [])

  const getTrending = async ()  => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=10`);
    const data = await api.json();
    setTrending(data.recipes);
    console.log(data.recipes);
 
  };
 
  return ( 
  <div>
        <Wrapper>
          <h3>Trending</h3>

          <Splide options={{
            perPage: 4,
            arrows: false,
            gap: "5rem",
          }}>
          {trending.map((recipe) => {
            return (
              <SplideSlide>
              <Card>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title}/>
              </Card>
              </SplideSlide>
            );
          })}
          </Splide>
        </Wrapper>
  </div>
  );
}

const Wrapper = styled.div `
  margin: 4rem 0rem;
`
const Card = styled.div `
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

  p{
    display: flex;
    justify-content: center;
  }
`

