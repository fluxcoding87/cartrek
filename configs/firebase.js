// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuQYxyFSh__JeFgi0Sglz7I90Z9FdKfHQ",
  authDomain: "cartrek-a5713.firebaseapp.com",
  projectId: "cartrek-a5713",
  storageBucket: "cartrek-a5713.appspot.com",
  messagingSenderId: "522256742083",
  appId: "1:522256742083:web:c1870591764439f2bc1476",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
