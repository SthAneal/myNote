// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// SDK for google authenticatioin
import { getAuth } from "firebase/auth";

// SDK for google realtime database
import  { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzwe2MGMleYcPrseYPODAH_cg4jSe7Fwc",
  authDomain: "mynoteapp-80a2f.firebaseapp.com",
  projectId: "mynoteapp-80a2f",
  storageBucket: "mynoteapp-80a2f.appspot.com",
  messagingSenderId: "617781700845",
  appId: "1:617781700845:web:50ab68e2cbd228b54bc4e4",
  // database URL
  databaseURL: "https://mynoteapp-80a2f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);