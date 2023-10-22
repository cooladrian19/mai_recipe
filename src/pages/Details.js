import React from "react";
import "./Details.css";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

import mockImage1 from "../assets/mock/mock-image-1.jpg";

export default function Details() {
  const mockTrending = [
    {
      title: "Mock Recipe 1",
      image: mockImage1,
    },
  ];

  return (
    <div className="footer-margin">
      <Navbar />
      {/* DETAIL HEADER */}

      <div className="detail-wrapper">
        {mockTrending.map((recipe, index) => (
          <div className="detail-container">
            <div className="detail-img">
              <img src={recipe.image} alt={recipe.title} />
            </div>

            <div className="detail-ingredients">
              <h3>ingredients</h3>
              <ul>
                <li>meat</li>
                <li>meaasdsadsadt</li>
                <li>meaasdat</li>
                <li>meat</li>
                <li>meat</li>
                <li>meaasdsadt</li>
                <li>measdat</li>
                <li>meat</li>
                <li>masdasdsaeat</li>
                <li>meat</li>
                <li>meat</li>
                <li>medsat</li>
                <li>meat</li>
                <li>masdsaeat</li>
                <li>meat</li>
                <li>measdt</li>
                <li>meat</li>
                <li>measdasdsadt</li>
                <li>meat</li>
                <li>meat</li>
                <li>meat</li>
              </ul>
            </div>

            <div className="detail-procedures">
              <h3>procedures</h3>
              <ol>
                <li>asdsadsadasd</li>
                <li>asdsadsadasd</li>
                <li>asdsadsadasd</li>
                <li>asdsadsadasd</li>
                <li>asdsadsadasd</li>
                <li>asdsadsadasd</li>
              </ol>
            </div>
          </div>
        ))}

        {/* DETAIL BODY */}
      </div>

      <Footer />
    </div>
  );
}
