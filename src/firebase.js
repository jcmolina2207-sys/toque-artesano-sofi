import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6UYBhoGeJTODogiAZDMS5Eu4YJCb6dSQ",
  authDomain: "toqueartesanodesofi-73bde.firebaseapp.com",
  projectId: "toqueartesanodesofi-73bde",
  storageBucket: "toqueartesanodesofi-73bde.firebasestorage.app",
  messagingSenderId: "390299533469",
  appId: "1:390299533469:web:b998b7aba9458d9caa9474",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);