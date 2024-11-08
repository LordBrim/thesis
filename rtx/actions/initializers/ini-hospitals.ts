import { createAsyncThunk } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "firebase-config";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

const emptyIncentives = {
  info: "",
  number: 4,
  data: [{ position: 4, incentive: "Priority" }],
};

export const addEmptyIncentivesToAllHospitals = createAsyncThunk(
  "hospitals/addEmptyIncentivesToAll",
  async (_, { rejectWithValue }) => {
    try {
      const hospitalsCollectionRef = collection(FIRESTORE_DB, "hospital");
      const querySnapshot = await getDocs(hospitalsCollectionRef);
      const updatePromises = querySnapshot.docs.map((hospitalDoc) => {
        const hospitalDocRef = doc(FIRESTORE_DB, "hospital", hospitalDoc.id);
        return updateDoc(hospitalDocRef, { incentives: emptyIncentives });
      });
      await Promise.all(updatePromises);
      console.log("Empty incentives added to all hospitals.");
      return "Success";
    } catch (error) {
      console.error("Error adding empty incentives to all hospitals:", error);
      return rejectWithValue(
        "Failed to add empty incentives to all hospitals."
      );
    }
  }
);
