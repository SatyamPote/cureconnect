import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

console.log("firebase.ts: Imports successful");

const firebaseConfig = {
  apiKey: "AIzaSyCHEC0p89XtARfEJGcMTNXTtnVOjnWkJvQ",
  authDomain: "cure-connect-567f6.firebaseapp.com",
  projectId: "cure-connect-567f6",
  storageBucket: "cure-connect-567f6.firebasestorage.app",
  messagingSenderId: "825178518780",
  appId: "1:825178518780:web:2f56c1bdac24af06c59379",
  measurementId: "G-BCH97TB5K7"
};

let app;
let db;
let auth;

try {
  console.log("firebase.ts: Initializing app...");
  app = initializeApp(firebaseConfig);
  console.log("firebase.ts: App initialized", app);

  db = getFirestore(app);
  console.log("firebase.ts: Firestore initialized", db);

  auth = getAuth(app);
  console.log("firebase.ts: Auth initialized", auth);
} catch (error) {
  console.error("firebase.ts: Error initializing Firebase:", error);
}

export { db, auth };

// Export Auth functions directly from the SDK
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
};
