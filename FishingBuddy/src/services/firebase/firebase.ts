import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQCfF5FvIGNpgZY3vKfdAMM-0eTWzZPrw",
  authDomain: "fishingbuddy-e8769.firebaseapp.com",
  projectId: "fishingbuddy-e8769",
  storageBucket: "fishingbuddy-e8769.firebasestorage.app",
  messagingSenderId: "30244891570",
  appId: "1:30244891570:web:a4cfcb5a783285fd3bd2ab",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

// TODO: How to persist the user session?
