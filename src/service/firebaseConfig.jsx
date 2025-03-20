// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6DXL6YO4tbHA-kLhPdTusP6uD4kIAdiI",
  authDomain: "ai-trip-planner-682fb.firebaseapp.com",
  projectId: "ai-trip-planner-682fb",
  storageBucket: "ai-trip-planner-682fb.firebasestorage.app",
  messagingSenderId: "197879003193",
  appId: "1:197879003193:web:42ce8201c387e15c41b5e8",
  measurementId: "G-FMCNKZFV3Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);