const emptyIncentives = {
  info: "",
  number: 0,
  data: [],
};

export const addEmptyIncentivesToAllHospitals = createAsyncThunk(
  "hospitals/addEmptyIncentivesToAll",
  async (_, { rejectWithValue }) => {
    try {
      // Reference to the hospital collection
      const hospitalsCollectionRef = collection(FIRESTORE_DB, "hospital");

      // Fetch all hospital documents
      const querySnapshot = await getDocs(hospitalsCollectionRef);

      // Update each hospital document
      const updatePromises = querySnapshot.docs.map((hospitalDoc) => {
        const hospitalDocRef = doc(FIRESTORE_DB, "hospital", hospitalDoc.id);
        return updateDoc(hospitalDocRef, { incentives: emptyIncentives });
      });

      // Await all updates
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
