import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAA608mmOO5UKNlGgWY92J2lH4X904PEao",
  authDomain: "mai-s-recipe.firebaseapp.com",
  databaseURL: "https://mai-s-recipe-default-rtdb.firebaseio.com",
  projectId: "mai-s-recipe",
  storageBucket: "mai-s-recipe.appspot.com",
  messagingSenderId: "134204165167",
  appId: "1:134204165167:web:21615b685ba2a540a64ada"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
