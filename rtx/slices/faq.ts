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
  const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
  await addDoc(faqsCollectionRef, {
    title,
    questions: [{ question, answer }],
  });
};

export const updateFAQInFirebase = async (
  id: string,
  updatedQuestion: { id: string; question: string; answer: string }
) => {
  const faqDocRef = doc(FIRESTORE_DB, "faq", id);
  await updateDoc(faqDocRef, {
    questions: updateDoc.questions.map((q: any) =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    ),
  });
};

export const deleteFAQFromFirebase = async (id: string) => {
  const faqDocRef = doc(FIRESTORE_DB, "faqs", id);
  await deleteDoc(faqDocRef);
};

interface FAQsState {
  faqs: Array<{
    title: string;
    questions: Array<QuestionState>;
  }>;
}

interface QuestionState {
  question: string;
  answer: string;
}

const initialState: FAQsState = {
  faqs: [
    {
      title: "Andrei Sager Gumagana",
      questions: [
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
      questions: [
        { question: "Question number 1?", answer: "Answer number 1" },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
    {
      title: "Blood",
      questions: [
        { question: "Question number 1?", answer: "Answer number 1" },
        { question: "Question number 2?", answer: "Answer number 2" },
        { question: "Question number 3?", answer: "Answer number 3" },
      ],
    },
    {
      title: "Other Questions",
      questions: [
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
      action: PayloadAction<{ title: string; newQuestion: QuestionState }>
    ) => {
      const { title, newQuestion } = action.payload;
      const { question, answer } = newQuestion;
      const faqIndex = state.faqs.findIndex((faq) => faq.title === title);

      if (faqIndex !== -1) {
        state.faqs[faqIndex].questions.push({ question, answer });
      } else {
        state.faqs.push({ title, questions: [{ question, answer }] });
      }
    },
    updateQuestion: (
      state,
      action: PayloadAction<{ faqId: string; question: QuestionState }>
    ) => {
      const { faqId, question } = action.payload;
      const faq = state.faqs.find((faq) => faq.title === faqId);

      if (faq) {
        const questionIndex = faq.questions.findIndex(
          (q) => q.id === question.id
        );
        if (questionIndex !== -1) {
          faq.questions[questionIndex] = question;
        }
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ faqId: string; questionId: string }>
    ) => {
      const { faqId, questionId } = action.payload;
      const faq = state.faqs.find((faq) => faq.title === faqId);

      if (faq) {
        faq.questions = faq.questions.filter((q) => q.id !== questionId);
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

export const selectCount = (state: RootState) => state.user.user;

export default faqsSlice.reducer;
