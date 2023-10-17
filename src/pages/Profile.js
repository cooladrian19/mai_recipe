import React from "react";
import "./Profile.css";
import Navbar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import ProfileEdit from "../components/ProfileEdit/ProfileEdit";

export default function Profile() {
  return (
    <div className="footer-margin">
      <Navbar />
        <ProfileEdit />
      <Footer />
    </div>
  );
}
