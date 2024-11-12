import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const defaultUserIncentive = {
  hospitalUuid: "GjaJAdRPfST9jKa5Mz9RXCzD7GN2",
  claimed: 0,
  timesCompleted: 0,
};

export const addDefaultIncentivesToAllUsers = async () => {
  try {
    const usersCollectionRef = collection(FIRESTORE_DB, "User");
    const querySnapshot = await getDocs(usersCollectionRef);

    const updatePromises = querySnapshot.docs.map((userDoc) => {
      const userDocRef = doc(FIRESTORE_DB, "User", userDoc.id);
      return updateDoc(userDocRef, {
        incentives: [defaultUserIncentive],
      });
    });

    await Promise.all(updatePromises);
    console.log("Default incentives added to all users.");
    return "Success"; // This can be returned or logged as a confirmation
  } catch (error) {
    console.error("Error adding default incentives to all users:", error);
    throw new Error("Failed to add default incentives to all users.");
  }
};
