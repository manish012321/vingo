import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "vingo-c3003.firebaseapp.com",
  projectId: "vingo-c3003",
  storageBucket: "vingo-c3003.firebasestorage.app",
  messagingSenderId: "512353726530",
  appId: "1:512353726530:web:d4065e64f8707dd7f53ddb",
  measurementId: "G-X6MYLW7PTK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };