
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBt4BETg2ZYL9Gvk-6cwyJSxSoIxl1BaEI",
    authDomain: "sit313-p4-6b84e.firebaseapp.com",
    projectId: "sit313-p4-6b84e",
    storageBucket: "sit313-p4-6b84e.firebasestorage.app",
    messagingSenderId: "1008793287520",
    appId: "1:1008793287520:web:223eb8a3142e7f6a4a7c05",
    measurementId: "G-3XK8Q5NLMW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
