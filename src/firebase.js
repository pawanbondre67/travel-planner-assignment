// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB3BjusRNWvqgoWZU_eXKMU2yi3QWN1IfY",
  authDomain: "assignment-49950.firebaseapp.com",
  projectId: "assignment-49950",
  storageBucket: "assignment-49950.appspot.com",
  messagingSenderId: "631775149310",
  appId: "1:631775149310:web:5f26c7482db83f2481f9af",
  measurementId: "G-SG14MWB7ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
