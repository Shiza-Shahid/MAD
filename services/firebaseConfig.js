// Firebase v9 modular SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoL1mKkxnZfxMaUcQ0I-kPl4Sjw9Ma1wE",
  authDomain: "notesapp-a37bb.firebaseapp.com",
  projectId: "notesapp-a37bb",
  storageBucket: "notesapp-a37bb.firebasestorage.app",
  messagingSenderId: "362352259480",
  appId: "1:362352259480:web:0552250ce3447f4b503bed",
  measurementId: "G-87G91BF1L2"
};

const app = initializeApp(firebaseConfig);

// ✅ SIMPLE AUTH (works perfectly in Expo)
export const auth = getAuth(app);

export const db = getFirestore(app);