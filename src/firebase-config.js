import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCNxROhCAcjr60Q1of87XhZziFPYC9T-V8",
    authDomain: "content-aggregator-a9559.firebaseapp.com",
    projectId: "content-aggregator-a9559",
    storageBucket: "content-aggregator-a9559.appspot.com",
    messagingSenderId: "125319460329",
    appId: "1:125319460329:web:9fbe7a211028d3fbd50778"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const auth = getAuth();
