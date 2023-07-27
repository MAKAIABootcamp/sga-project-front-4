// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClLiIFUp1l16UCrimO_8B8e-gu5gGic5Y",
  authDomain: "sga-makaia.firebaseapp.com",
  projectId: "sga-makaia",
  storageBucket: "sga-makaia.appspot.com",
  messagingSenderId: "69000189912",
  appId: "1:69000189912:web:1d9024ffa0182426d384ad",
  measurementId: "G-J5XVT29SEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
//console.log(auth);
export const dataBase = getFirestore(app);
export { app };
