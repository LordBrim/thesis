import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const getFAQs = createAsyncThunk("getFAQs", async () => {
  try {
    const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
    const querySnapshot = await getDocs(faqsCollectionRef);

    const faqs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return faqs as FAQsState["faqs"];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return null;
  }
});

export const addFAQToFirebase = async (question: string, answer: string) => {
  const faqsCollectionRef = collection(FIRESTORE_DB, "faqs");
  await addDoc(faqsCollectionRef, { question, answer });
};

export const updateFAQInFirebase = async (
  id: string,
  question: string,
  answer: string
) => {
  const faqDocRef = doc(FIRESTORE_DB, "faqs", id);
  await updateDoc(faqDocRef, { question, answer });
};

export const deleteFAQFromFirebase = async (id: string) => {
  const faqDocRef = doc(FIRESTORE_DB, "faqs", id);
  await deleteDoc(faqDocRef);
};

interface FAQsState {
  faqs: Array<QuestionState>;
}

interface QuestionState {
  id: string;
  question: string;
  answer: string;
}

const initialState: FAQsState = {
  faqs: [],
};

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    createQuestion: (state, action: PayloadAction<QuestionState>) => {
      state.faqs.push(action.payload);
    },
    updateQuestion: (state, action) => {
      const index = state.faqs.findIndex((faq) => faq.id === action.payload.id);
      if (index !== -1) {
        state.faqs[index] = action.payload;
      }
    },
    deleteQuestion: (state, action) => {
      state.faqs = state.faqs.filter((faq) => faq.id !== action.payload.id);
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
