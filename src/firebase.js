import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIhgKqTOhsSWwsLpA6IxJ53Udfo8rl86s",
  authDomain: "surai-bd620.firebaseapp.com",
  projectId: "surai-bd620",
  storageBucket: "surai-bd620.firebasestorage.app",
  messagingSenderId: "107584540822",
  appId: "1:107584540822:web:a49304a7786f6081a632b7",
  measurementId: "G-FPXM5VLE2P"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const handleSignIn = () => {
    return signInWithPopup(auth, provider);
};

const handleSignOut = () => {
  return signOut(auth);
};

export { db, auth, provider, handleSignIn, handleSignOut, onAuthStateChanged };
