// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER,
  appId: import.meta.env.VITE_APP,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase'deki auth apisinin refeeransini alma
export const auth = getAuth(app);

// google saglayicisinin kurulumunu yap
export const provider = new GoogleAuthProvider();

//veritabanin referansini alma
export const db = getFirestore(app);
