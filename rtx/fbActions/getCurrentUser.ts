import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { doc, getDoc } from "firebase/firestore";

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const user = FIREBASE_AUTH.currentUser;
    const docRef = doc(FIRESTORE_DB, "User", user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    return {
      displayName: docSnap.data().displayName,
      email: docSnap.data().email,
      password: docSnap.data().password,
      role: docSnap.data().role,
    };
  } catch (error) {
    console.error("Failed to getCurrentUser.");
  }
});
