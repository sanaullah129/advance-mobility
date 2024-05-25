// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID as string,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_API_URL_FIREBASE_SENDERID as string,
    appId: process.env.REACT_FIREBASE_APPID as string,
    measurementId: process.env.REACT_FIREBASE_MEASUREMENTID as string
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
