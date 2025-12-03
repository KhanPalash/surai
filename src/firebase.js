import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Safely parse the Firebase config from environment variables
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth(app);

// Export the auth instance to be used in other parts of the app
export { auth };
