// auth.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Sign up a new user
export function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Successfully signed up!"))
    .catch(e => alert(e.message));
}

// Login
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => { 
      alert("Successfully logged in!"); 
      window.location.href = "dashboard.html"; 
    })
    .catch(e => alert(e.message));
}

// Protect dashboard page
export function protectPage() {
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// Logout
export function logout() {
  signOut(auth).then(() => window.location.href = "index.html");
}
