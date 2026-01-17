// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWOpRk0nP2cZz7SxJUd8ayUVPvZsUeC5U",
  authDomain: "english-studies3.firebaseapp.com",
  projectId: "english-studies3",
  storageBucket: "english-studies3.firebasestorage.app",
  messagingSenderId: "492650658265",
  appId: "1:492650658265:web:f4e6fd15b7f1a64954c1c8",
  measurementId: "G-9L0MXMD0T8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
