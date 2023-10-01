// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhy7LJ401L2QNiBDB8eCQazXTI3rqCKjY",
  authDomain: "greenstore-f6a65.firebaseapp.com",
  projectId: "greenstore-f6a65",
  storageBucket: "greenstore-f6a65.appspot.com",
  messagingSenderId: "416147996110",
  appId: "1:416147996110:web:6125ed2cd1a4ed5d47ff9f",
  measurementId: "G-WT5T7YJ2E5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
// console.log('db', 'sadsad')
export const storage = getStorage(app);

// import { initializeApp } from "firebase/app";
// import {getFirestore} from 'firebase/firestore'
// import {getStorage} from 'firebase/storage'
// // import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBlHBz93J5p-uxljS2fdU6q-PxWsRInp5w",
//   authDomain: "hinh-4cb2a.firebaseapp.com",
//   projectId: "hinh-4cb2a",
//   storageBucket: "hinh-4cb2a.appspot.com",
//   messagingSenderId: "303978664768",
//   appId: "1:303978664768:web:d59287f19e10187b08e0a5"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// // console.log('db', db)
// export const storage = getStorage(app)