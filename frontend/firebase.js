import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zomato-22c3c.firebaseapp.com",
  projectId: "zomato-22c3c",
  storageBucket: "zomato-22c3c.firebasestorage.app",
  messagingSenderId: "600366850644",
  appId: "1:600366850644:web:e8cc8307518b454b58c3c1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };