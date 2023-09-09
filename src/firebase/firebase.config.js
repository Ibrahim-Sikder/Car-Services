// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAsN17PMNgu12Wt4-hxv21KDYxD2mPSAo",
  authDomain: "cars-doctor-b88ab.firebaseapp.com",
  projectId: "cars-doctor-b88ab",
  storageBucket: "cars-doctor-b88ab.appspot.com",
  messagingSenderId: "69613547940",
  appId: "1:69613547940:web:34ff4e84746966978f5131",
  measurementId: "G-BBKK639SRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;