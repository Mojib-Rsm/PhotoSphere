import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  "projectId": "photosphere-7fjv5",
  "appId": "1:1090082873516:web:ec67ea53c622425f547f09",
  "storageBucket": "photosphere-7fjv5.firebasestorage.app",
  "apiKey": "AIzaSyCctA0CavRMkNeWP3pkZX9pqVv1P_s_m-k",
  "authDomain": "photosphere-7fjv5.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "1090082873516"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
