// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-bMY0fyMC9XX3QZl_2z4AtjNSphf8pxE",
  authDomain: "spreadit-b8b53.firebaseapp.com",
  projectId: "spreadit-b8b53",
  storageBucket: "spreadit-b8b53.appspot.com",
  messagingSenderId: "932668103377",
  appId: "1:932668103377:web:37af04c0d79ebfb6f7c3f0",
  measurementId: "G-14L5Y6VJ0B",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
