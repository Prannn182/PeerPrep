import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVUztTWCkp8kGVXdPHNpQkgiUKpzZB75g",
  authDomain: "peerprep-2a90f.firebaseapp.com",
  projectId: "peerprep-2a90f",
  storageBucket: "peerprep-2a90f.firebasestorage.app",
  messagingSenderId: "306809999688",
  appId: "1:306809999688:web:44b51f1611123a24ea237d",
  measurementId: "G-0948CN6FR2"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app);
export const db=getFirestore(app);
