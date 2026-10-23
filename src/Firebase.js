import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-site-2c4d0.firebaseapp.com",
  projectId: "movie-site-2c4d0",
  storageBucket: "movie-site-2c4d0.firebasestorage.app",
  messagingSenderId: "661825128863",
  appId: "1:661825128863:web:bc44afd29372f1418d15aa",
  measurementId: "G-1FDKTLYCPZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;