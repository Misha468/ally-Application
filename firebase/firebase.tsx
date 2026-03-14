// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACtH0mo62odxQ38b2HTAI0NGX28uxzFXw",
  authDomain: "ally-3aa8e.firebaseapp.com",
  databaseURL: "https://ally-3aa8e-default-rtdb.firebaseio.com",
  projectId: "ally-3aa8e",
  storageBucket: "ally-3aa8e.firebasestorage.app",
  messagingSenderId: "682998781580",
  appId: "1:682998781580:web:32b6e03b7a15842333cda9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
