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

const firebaseConfig = {
  apiKey: "AIzaSyCHEC0p89XtARfEJGcMTNXTtnVOjnWkJvQ",
  authDomain: "cure-connect-567f6.firebaseapp.com",
  projectId: "cure-connect-567f6",
  storageBucket: "cure-connect-567f6.firebasestorage.app",
  messagingSenderId: "825178518780",
  appId: "1:825178518780:web:2f56c1bdac24af06c59379",
  measurementId: "G-BCH97TB5K7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Export Auth functions directly from the SDK
export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
};
