// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoTNBDD94KFtEUkQ-4WUE_azYeO8eK6Sk",
  authDomain: "job-portal-system-df17c.firebaseapp.com",
  projectId: "job-portal-system-df17c",
  storageBucket: "job-portal-system-df17c.firebasestorage.app",
  messagingSenderId: "72057070878",
  appId: "1:72057070878:web:f89ae0dc4e86dc81e8550f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);