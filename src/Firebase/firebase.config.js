// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC57G1WyYAhBlv2MFT8YTdtIt54PGKYhHs",
  authDomain: "paw-mart-183d9.firebaseapp.com",
  projectId: "paw-mart-183d9",
  storageBucket: "paw-mart-183d9.firebasestorage.app",
  messagingSenderId: "436392199861",
  appId: "1:436392199861:web:f8ad2e9d2edf23059da0fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);