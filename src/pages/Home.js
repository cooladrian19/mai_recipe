import Trending from "../components/Trending/Trending";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Search from "../components/Search/Search";

import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Search />
      <Trending />
      <Footer />
    </div>
  );
}
