// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzqM1gkgdlM6II2c4bONXUjWFN6sOuKrQ",
  authDomain: "library-management-crud.firebaseapp.com",
  projectId: "library-management-crud",
  storageBucket: "library-management-crud.firebasestorage.app",
  messagingSenderId: "23989371064",
  appId: "1:23989371064:web:65e1fe633ffc2048afb44d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);