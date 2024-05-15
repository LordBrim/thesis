import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbU8mTN_2wmMVeBwKSZ6qzBnFz9q2LuGY",
  authDomain: "lifeline-eb7f0.firebaseapp.com",
  projectId: "lifeline-eb7f0",
  storageBucket: "lifeline-eb7f0.appspot.com",
  messagingSenderId: "258884201826",
  appId: "1:258884201826:web:a8a52b5e753d461ba2d03b",
  measurementId: "G-C6Z8L9094C",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
