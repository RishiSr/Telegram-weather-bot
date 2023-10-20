
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// const firebaseConfig = {
//     apiKey: "AIzaSyBOLXu8O7v9HfdV11llllfmXHIN0JIkBWc",
//     authDomain: "telegram-bot-admin-ab93d.firebaseapp.com",
//     projectId: "telegram-bot-admin-ab93d",
//     storageBucket: "telegram-bot-admin-ab93d.appspot.com",
//     messagingSenderId: "87270355616",
//     appId: "1:87270355616:web:0573d4cc5890cf48504fc5",
//     measurementId: "G-ZWHR3W6XDH"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;