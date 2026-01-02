import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOO5NtfV0u3meC42QLuNuldffHv7TYw4c",
  authDomain: "medimate-academy-45b1c.firebaseapp.com",
  projectId: "medimate-academy-45b1c",
  storageBucket: "medimate-academy-45b1c.firebasestorage.app",
  messagingSenderId: "703414834554",
  appId: "1:703414834554:web:5eb7453eabc926cddbb2c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);