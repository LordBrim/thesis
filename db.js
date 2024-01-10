// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTT1L_N926jZOUapJvPGbpjP5gz-WsJ48",
  authDomain: "lifeline-423a7.firebaseapp.com",
  databaseURL:
    "https://lifeline-423a7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lifeline-423a7",
  storageBucket: "lifeline-423a7.appspot.com",
  messagingSenderId: "309285079165",
  appId: "1:309285079165:web:4a471dd52f38d0912f0914",
  measurementId: "G-63BXDE1TZQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, app, {
  experimentalForceLongPolling: true,
});
// Initialize Firestore
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export default db;
