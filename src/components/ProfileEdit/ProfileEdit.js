import React, { useEffect, useState } from "react";
import { auth, database } from "../../FirebaseConfig.js";
import { ref as dbRef, set, update, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import defaultProfile from "../../assets/defaultProfile.png";
import { storage } from "../../FirebaseConfig.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

import "./style.css";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [Name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (user && initialLoad) {

      const userProfileRef = dbRef(database, `users/${user.uid}`);
      onValue(userProfileRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setName(userData.Name || '');
          setUsername(userData.username || '');
          setDob(userData.dob || '');
          if (userData.profilePicture) {
            setProfileImageUrl(userData.profilePicture);
          }
        }
      });
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const newImageUrl = await uploadImageAndGetURL(e.target.files[0]);
      setProfileImageUrl(newImageUrl);
      setProfileImage(e.target.files[0]);
    }
  };
  
  const uploadImageAndGetURL = async (imageFile) => {
    if (!imageFile) return null;
    
    const user = auth.currentUser;
    const fileRef = storageRef(storage, `profile_images/${user.uid}`);
    await uploadBytes(fileRef, imageFile);
    return getDownloadURL(fileRef);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const imageURL = await uploadImageAndGetURL(profileImage);
  
    if (user) {
      try {
        const imageURL = await uploadImageAndGetURL(profileImage);
        await updateProfile(user, {
          displayName: username,
          photoURL: imageURL,
        });
        const userProfileRef = dbRef(database, `users/${user.uid}`);
        await update(userProfileRef, {
          Name: Name,
          username: username,
          dob: dob,
          profilePicture: imageURL,
        });
        console.log("User profile and image updated!");
        alert("Changes have been saved."); 
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };
  
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };
  

  return (
    <div className="profile-container">
       <h2 className="edit-header">Profile Edit</h2>
      <div className="profile-wrapper">
        <form className="profile-edit-container" onSubmit={handleFormSubmit}>
        <div className="profile-img-container">
            <img
              src={profileImageUrl || defaultProfile}
              alt="Profile"
              className="profile-img-circle"
            />
            <div className="profile-img-overlay">
              <i className="fa fa-pencil profile-img-edit-icon"></i>
              <input
                id="profile-image-input"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="profile-image-input">change photo</label>
            </div>
          </div>
          <div className="profile-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="profile-row">
            <label>Username:</label>
            <input
              type="text"
              name="user-name"
              className="input-field"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="profile-row">
            <label>Date of Birth:</label>
            <input
              className="input-field"
              type="date"
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            ></input>
          </div>
          <button id="edit" className="profile-edit-button" type="submit">
            update changes
          </button>
        </form>
      </div>
      <button
        id="signOut"
        className="profile-edit-button"
        onClick={handleSignOut}
      >
        {" "}
        signout{" "}
      </button>
    </div>
  );
}
