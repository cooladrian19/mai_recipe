import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Pages from "./pages/Pages";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home
      break
    case "/about":
      Component = About
      break
  }

  return (
    <div className="App">
      <Navbar />
      <Component />
    </div>
  );
}

export default App;
