import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0JQdJTDxLoKRym1Pqa4zoxeVh3TlLoQ8",
  authDomain: "queue-interest.firebaseapp.com",
  projectId: "queue-interest",
  storageBucket: "queue-interest.appspot.com",
  messagingSenderId: "79849674144",
  appId: "1:79849674144:web:b12eeb5215c24e5c1ac0c5",
  measurementId: "G-5TJ0B7GSB5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);
