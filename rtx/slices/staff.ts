import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getHopitalStaff = createAsyncThunk<StaffState["staff"], string>(
  "getHopitalStaff",
  async (hospitalName) => {
    try {
      const staffQuery = query(
        collection(FIRESTORE_DB, "User"),
        where("role", "==", "staff"),
        where("hospitalName", "==", hospitalName)
      );
      const querySnapshot = await getDocs(staffQuery);
      const staff = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uuid: doc.id,
      })) as StaffState["staff"];
      return staff;
    } catch (error) {
      console.error("Error fetching staff:", error);
      return [];
    }
  }
);

interface StaffState {
  staff: {
    uuid?: string;
    displayName: string;
    email: string;
    password: string;
    role: "user" | "staff" | "admin" | "super";
    hospitalName: string;
  }[];
}

const initialState: StaffState = {
  staff: [
    {
      uuid: "dOpturiUmjxzWMhFf7Qv",
      displayName: "Andrei Sager",
      email: "andrei@mail.com",
      password: "123456",
      role: "staff",
      hospitalName: "STI Sta. Mesa",
    },
    {
      uuid: "wLBJcMvAmdONhDpQSlGbbXsL3KS2",
      displayName: "Angelo Munar",
      email: "angelo@mail.com",
      password: "123456",
      role: "staff",
      hospitalName: "STI Sta. Mesa",
    },
  ],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    //   createQuestion: (
    //     state,
    //     {
    //       payload: { title, newQuestion },
    //     }: PayloadAction<{ title: string; newQuestion: StaffState }>
    //   ) => {
    //     let faq = state.faqs.find((faq) => faq.title === title);
    //     if (faq) {
    //       faq.data = faq.data || [];
    //       faq.data.push(newQuestion);
    //     } else {
    //       state.faqs.push({ title, data: [newQuestion] });
    //     }
    //   },
    //   updateQuestion: (
    //     state,
    //     action: PayloadAction<{
    //       title: string;
    //       oldQuestion: StaffState;
    //       updatedQuestion: StaffState;
    //     }>
    //   ) => {
    //     const { title, oldQuestion, updatedQuestion } = action.payload;
    //     const { question, answer } = updatedQuestion;
    //     const faqIndex = state.faqs.findIndex((faq) => faq.title === title);
    //     if (faqIndex !== -1) {
    //       const questionIndex = state.faqs[faqIndex].data.findIndex(
    //         (q) => q.question === oldQuestion.question
    //       );
    //       if (questionIndex !== -1) {
    //         state.faqs[faqIndex].data[questionIndex] = {
    //           question,
    //           answer,
    //         };
    //       }
    //     }
    //   },
    //   deleteQuestion: (
    //     state,
    //     action: PayloadAction<{ title: string; deletedQuestion: datatate }>
    //   ) => {
    //     const { title, deletedQuestion } = action.payload;
    //     const faq = state.faqs.find((faq) => faq.title === title);
    //     if (faq) {
    //       faq.data = faq.data.filter(
    //         (q) =>
    //           q.question !== deletedQuestion.question ||
    //           q.answer !== deletedQuestion.answer
    //       );
    //     }
    //   },
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getHopitalStaff.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.staff = action.payload;
      } else {
        state.staff = initialState.staff;
      }
    });
  },
});

export const selectCount = (state: RootState) => state.staff;

export default staffSlice.reducer;
