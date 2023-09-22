// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, set, ref, update} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Mai's recipe Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA608mmOO5UKNlGgWY92J2lH4X904PEao",
  authDomain: "mai-s-recipe.firebaseapp.com",
  databaseURL: "https://mai-s-recipe-default-rtdb.firebaseio.com",
  projectId: "mai-s-recipe",
  storageBucket: "mai-s-recipe.appspot.com",
  messagingSenderId: "134204165167",
  appId: "1:134204165167:web:21615b685ba2a540a64ada",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();




// function to signup users
signup.addEventListener("click", (e) => {
  var username = document.getElementById("signup-username").value;
  var email = document.getElementById("signup-email").value;
  var password = document.getElementById("signup-password").value;

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // save to realtime database
      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
      })

      alert("user signed up :)");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("oops: " + errorMessage);
    });
});


// function to login users
login.addEventListener("click", (e) => {
  var password = document.getElementById("login-password").value;
  var email = document.getElementById("login-email").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const updateDate = new Date();

      update(ref(database, "users/" + user.uid), {
        last_login: updateDate,
      })
      alert('user logged in!');

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("oops: " + errorMessage);
    });
});


// function to manage users (log out and log in)
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// function to logout users
signOut.addEventListener('click' ,(e) => {
  signOut(auth).then(() => {
    // Sign-out successful.
    alert('user logged out');
  }).catch((error) => {
    // An error happened.
    alert("oops: " + errorMessage);
  });
})