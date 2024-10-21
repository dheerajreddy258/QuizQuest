// Import the functions you need from the SDKs you need
/*import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDb2m60eS0HtSeuGx33EzeTwLRKqw8wQ88",
  authDomain: "quizquest-10d86.firebaseapp.com",
  projectId: "quizquest-10d86",
  storageBucket: "quizquest-10d86.appspot.com",
  messagingSenderId: "832566243326",
  appId: "1:832566243326:web:a1b86239745eb35a3c9aaf",
  measurementId: "G-B201P3V363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */ 

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDb2m60eS0HtSeuGx33EzeTwLRKqw8wQ88",
  authDomain: "quizquest-10d86.firebaseapp.com",
  projectId: "quizquest-10d86",
  storageBucket: "quizquest-10d86.appspot.com",
  messagingSenderId: "832566243326",
  appId: "1:832566243326:web:a1b86239745eb35a3c9aaf",
  measurementId: "G-B201P3V363"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();