// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrqR6ydvt7mqxbLhz2YCftvlelM2X_htE",
  authDomain: "clickpayapp-10109.firebaseapp.com",
  projectId: "clickpayapp-10109",
  storageBucket: "clickpayapp-10109.firebasestorage.app",
  messagingSenderId: "530818115476",
  appId: "1:530818115476:web:9d94a826d1450982399181",
  measurementId: "G-LX7PKHSJ5M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
