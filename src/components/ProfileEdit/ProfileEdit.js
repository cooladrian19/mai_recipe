import React from "react";
import "./style.css";

export default function ProfileEdit() {
  return (
    <div className="profile-container">
      <div className="profile-img">
        <label class="-label" for="file">
          <span class="glyphicon glyphicon-camera"></span>
          <span>Change Image</span>
        </label>
        <input type="file"></input>
      </div>


      <form className="profile-edit-container">
        <div className="profile-row">
          <label>First Name:</label>
          <input
            type="text"
            name="first-name"
            class="form-control"
            placeholder="first name"
          ></input>
        </div>
        <div className="profile-row">
          <label>Username:</label>
          <input
            type="text"
            name="user-name"
            class="form-control"
            placeholder="username"
          ></input>
        </div>
        <div className="profile-row">
          <label>Date of Birth:</label>
          <input
            className="input-field"
            type="date"
            name="dob"
            class="form-control"
          ></input>
        </div>
        <button id="edit" className="login-button" type="submit">
          edit
        </button>
      </form>

      
    </div>
  );
}
