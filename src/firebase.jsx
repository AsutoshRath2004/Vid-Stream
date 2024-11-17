// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYGwaDKZyNEjVS1HVPqbfPY9V-sArFTd8",
  authDomain: "mini-project-c1500.firebaseapp.com",
  projectId: "mini-project-c1500",
  storageBucket: "mini-project-c1500.appspot.com",
  messagingSenderId: "34135523188",
  appId: "1:34135523188:web:ad7e1104b5a80df9e23621"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
