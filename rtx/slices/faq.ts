import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getFAQs = createAsyncThunk("getFAQs", async () => {
  try {
    const docRef = doc(FIRESTORE_DB, "faqs");
    const docSnap = await getDoc(docRef);

    return docSnap.data() as FAQsState["faqs"];
  } catch (error) {
    return null;
  }
});

interface FAQsState {
  faqs: [];
}

const initialState: FAQsState = {
  faqs: [],
};

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    createQuestion: (state, action) => {
      // Immediately add the question to state and then add the question to firebase.
    },
    updateQuestion: (state, action) => {
      // Immediately update the question to state and then update the question to firebase.
    },
    deleteQuestion: (state, action) => {
      // Immediately delete the question to state and then delete the question to firebase.
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFAQs.fulfilled, (state, action) => {
      if (action.payload) {
        state.faqs = action.payload;
      } else {
        state.faqs = initialState.faqs;
      }
    });
  },
});

export const { createQuestion, updateQuestion, deleteQuestion } =
  faqsSlice.actions;

export const selectCount = (state: RootState) => state.user.user;

export default faqsSlice.reducer;
