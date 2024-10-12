// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4U3s5Llgws_0tra0He-B_rY_2wx4I_qc",
    authDomain: "assignment-ed2cf.firebaseapp.com",
    projectId: "assignment-ed2cf",
    storageBucket: "assignment-ed2cf.appspot.com",
    messagingSenderId: "841094638260",
    appId: "1:841094638260:web:56a05126898910e2a7c5e1"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
