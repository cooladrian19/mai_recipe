import React from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";




function App() {
  let Component;
  switch (window.location.pathname) {
    case "/":
      Component = Home;
      break;
    case "/about":
      Component = About;
      break;
    case "/login":
      Component = Login;
      break;
      default:
        Component = null;
    
  }

  return (
    <div className="App">
      <Component />
    </div>
  );
}

export default App;
