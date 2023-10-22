import React from "react";
import "./style.css";

export default function ProfileEdit() {
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-img">
          <input type="file"></input>
        </div>

        <form className="profile-edit-container">
          <div className="profile-row">
            <label>First Name:</label>
            <input
              type="text"
              name="first-name"
              className="input-field"
              placeholder="first name"
            ></input>
          </div>
          <div className="profile-row">
            <label>Username:</label>
            <input
              type="text"
              name="user-name"
              className="input-field"
              placeholder="username"
            ></input>
          </div>
          <div className="profile-row">
            <label>Date of Birth:</label>
            <input className="input-field" type="date" name="dob"></input>
          </div>
          <button id="edit" className="login-button" type="submit">
            update changes
          </button>
        </form>
      </div>
    </div>
  );
}
