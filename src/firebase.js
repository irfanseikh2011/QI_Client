import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import firebase from 'firebase/app';
import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyC0JQdJTDxLoKRym1Pqa4zoxeVh3TlLoQ8",
//   authDomain: "queue-interest.firebaseapp.com",
//   projectId: "queue-interest",
//   storageBucket: "queue-interest.appspot.com",
//   messagingSenderId: "79849674144",
//   appId: "1:79849674144:web:b12eeb5215c24e5c1ac0c5",
//   measurementId: "G-5TJ0B7GSB5"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDLJmEtiWuuYV9IjPVKhmI-AkLTi0RnIRk",
  authDomain: "queueinterest12.firebaseapp.com",
  projectId: "queueinterest12",
  storageBucket: "queueinterest12.appspot.com",
  messagingSenderId: "685515544097",
  appId: "1:685515544097:web:c816571c40f1597b043560"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);
