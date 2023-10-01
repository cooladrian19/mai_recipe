import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Pages from "./pages/Pages";
import Home from "./pages/Home";
import About from "./pages/About";
import Trending from "./components/Trending/Trending";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/about":
      Component = About;
      break;
      default:
        Component = null;
  }

  return (
    <div className="App">
      <Navbar />
      <Pages />
    </div>
  );
}

export default App;
