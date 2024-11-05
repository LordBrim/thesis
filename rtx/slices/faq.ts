import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "../../firebase-config";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const getFAQs = createAsyncThunk("getFAQs", async () => {
  try {
    const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
    const querySnapshot = await getDocs(faqsCollectionRef);
    const faqs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return faqs;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return null;
  }
});

export const addFAQToFirebase = async (
  title: string,
  question: string,
  answer: string
) => {
  try {
    const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
    const existingFAQQuery = query(
      faqsCollectionRef,
      where("title", "==", title)
    );
    const querySnapshot = await getDocs(existingFAQQuery);
    if (!querySnapshot.empty) {
      const faqDocRef = querySnapshot.docs[0].ref;
      await updateDoc(faqDocRef, {
        data: arrayUnion({ question, answer }),
      });
      console.log(`FAQ with title "${title}" updated successfully.`);
    } else {
      const newFAQDoc = await addDoc(faqsCollectionRef, {
        title,
        data: [{ question, answer }],
      });
      console.log(`New FAQ with title "${title}" created successfully.`);
      return newFAQDoc.id;
    }
  } catch (error) {
    console.error("Error adding/updating FAQ:", error);
  }
};

export const updateFAQInFirebase = async (
  title: string,
  oldQuestion: { question: string; answer: string },
  updatedQuestion: { question: string; answer: string }
) => {
  try {
    const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
    const q = query(faqsCollectionRef, where("title", "==", title));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const faqDoc = querySnapshot.docs[0];
      const data = faqDoc.data().data;
      const updateddata = data.map((q: any) =>
        q.question === oldQuestion.question && q.answer === oldQuestion.answer
          ? updatedQuestion
          : q
      );
      await updateDoc(faqDoc.ref, {
        data: updateddata,
      });
    }
  } catch (error) {
    console.error("Error updating question:", error);
  }
};

export const deleteQuestionInFirebase = async (
  title: string,
  deletedQuestion: { question: string; answer: string }
) => {
  try {
    const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
    const q = query(faqsCollectionRef, where("title", "==", title));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const faqDoc = querySnapshot.docs[0];
      const data = faqDoc.data().data;
      const updatedData = data.filter(
        (q: any) =>
          q.question !== deletedQuestion.question ||
          q.answer !== deletedQuestion.answer
      );
      await updateDoc(faqDoc.ref, {
        data: updatedData,
      });
    }
  } catch (error) {
    console.error("Error deleting question:", error);
  }
};

interface FAQsState {
  faqs: Array<{
    title: string;
    data: Array<DataState>;
  }>;
}

interface DataState {
  question: string;
  answer: string;
}

const initialState: FAQsState = {
  faqs: [
    {
      title: "Gumagana",
      data: [
        {
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vulputate metus vel purus rhoncus facilisis ac nec eros. Quisque eu efficitur erat. Fusce pellentesque hendrerit nibh nec cursus. Morbi sed dictum velit, sit amet bibendum sem. Nam mi ex, laoreet placerat aliquet eu, venenatis vel purus. Mauris ipsum velit, tincidunt sed augue vitae, dictum feugiat erat.",
        },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
    {
      title: "Blood Donation",
      data: [
        { question: "Question number 1?", answer: "Answer number 1" },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
    {
      title: "Blood",
      data: [
        { question: "Question number 1?", answer: "Answer number 1" },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
    {
      title: "Other data",
      data: [
        { question: "Question number 1?", answer: "Answer number 1" },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
  ],
};

export const faqsSlice = createSlice({
  name: "faqs",
  initialState,
  reducers: {
    createQuestion: (
      state,
      {
        payload: { title, newQuestion },
      }: PayloadAction<{ title: string; newQuestion: DataState }>
    ) => {
      let faq = state.faqs.find((faq) => faq.title === title);
      if (faq) {
        faq.data = faq.data || [];
        faq.data.push(newQuestion);
      } else {
        state.faqs.push({ title, data: [newQuestion] });
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{
        title: string;
        oldQuestion: DataState;
        updatedQuestion: DataState;
      }>
    ) => {
      const { title, oldQuestion, updatedQuestion } = action.payload;
      const { question, answer } = updatedQuestion;
      const faqIndex = state.faqs.findIndex((faq) => faq.title === title);

      if (faqIndex !== -1) {
        const questionIndex = state.faqs[faqIndex].data.findIndex(
          (q) => q.question === oldQuestion.question
        );

        if (questionIndex !== -1) {
          state.faqs[faqIndex].data[questionIndex] = {
            question,
            answer,
          };
        }
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ title: string; deletedQuestion: datatate }>
    ) => {
      const { title, deletedQuestion } = action.payload;
      const faq = state.faqs.find((faq) => faq.title === title);
      if (faq) {
        faq.data = faq.data.filter(
          (q) =>
            q.question !== deletedQuestion.question ||
            q.answer !== deletedQuestion.answer
        );
      }
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

export const selectCount = (state: RootState) => state.faqs;

export default faqsSlice.reducer;
