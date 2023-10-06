import Trending from "../components/Trending";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Trending />
      <Footer />
    </div>
  );
}
