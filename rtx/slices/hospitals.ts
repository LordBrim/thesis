import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "firebase-config";
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

// export const getFAQs = createAsyncThunk("getFAQs", async () => {
//   try {
//     const faqsCollectionRef = collection(FIRESTORE_DB, "faq");
//     const querySnapshot = await getDocs(faqsCollectionRef);

//     const faqs = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return faqs;
//   } catch (error) {
//     console.error("Error fetching FAQs:", error);
//     return null;
//   }
// });

// export const addFAQToFirebase = async (
//   title: string,
//   question: string,
//   answer: string
// ) => {
//   const faqsCollectionRef = collection(FIRESTORE_DB, "faq");

//   const existingFAQQuery = query(
//     faqsCollectionRef,
//     where("title", "==", title)
//   );
//   const querySnapshot = await getDocs(existingFAQQuery);

//   if (!querySnapshot.empty) {
//     const faqDocRef = querySnapshot.docs[0].ref;
//     await updateDoc(faqDocRef, {
//       questions: arrayUnion({ question, answer }),
//     });
//   } else {
//     await addDoc(faqsCollectionRef, {
//       title,
//       questions: [{ question, answer }],
//     });
//   }
// };

// export const updateFAQInFirebase = async (
//   title: string,
//   oldQuestion: { question: string; answer: string },
//   updatedQuestion: { question: string; answer: string }
// ) => {
//   try {
//     const faqsCollectionRef = collection(FIRESTORE_DB, "faq");

//     const q = query(faqsCollectionRef, where("title", "==", title));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const faqDoc = querySnapshot.docs[0];
//       const questions = faqDoc.data().questions;

//       const updatedQuestions = questions.map((q: any) =>
//         q.question === oldQuestion.question && q.answer === oldQuestion.answer
//           ? updatedQuestion
//           : q
//       );

//       await updateDoc(faqDoc.ref, {
//         questions: updatedQuestions,
//       });
//     }
//   } catch (error) {
//     console.error("Error updating question:", error);
//   }
// };

// export const deleteQuestionInFirebase = async (
//   title: string,
//   deletedQuestion: { question: string; answer: string }
// ) => {
//   try {
//     const faqsCollectionRef = collection(FIRESTORE_DB, "faq");

//     const q = query(faqsCollectionRef, where("title", "==", title));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const faqDoc = querySnapshot.docs[0];
//       const questions = faqDoc.data().questions;

//       const updatedQuestions = questions.filter(
//         (q: any) =>
//           q.question !== deletedQuestion.question ||
//           q.answer !== deletedQuestion.answer
//       );

//       await updateDoc(faqDoc.ref, {
//         questions: updatedQuestions,
//       });
//     }
//   } catch (error) {
//     console.error("Error deleting question:", error);
//   }
// };

interface HospitalsState {
  hospitals: Array<HospitalState>;
}

interface HospitalState {
  name: string;
  logoUrl: string;
  address: string;
  contactNumber: string;
  coordinates: CoordinatesState;
  stock: Array<StockState>;
}

interface CoordinatesState {
  latitude: number;
  longtitude: number;
}

interface StockState {
  type: string;
  available: boolean;
}

const initialState: HospitalsState = {
  hospitals: [
    {
      name: "UERM Medical Center",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/lifeline-eb7f0.appspot.com/o/hospitalDataLogo%2FGjaJAdRPfST9jKa5Mz9RXCzD7GN2.png?alt=media&token=1abc8b21-edc2-44da-aaf0-a69f6bb8a183",
      address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
      contactNumber: "(02) 8715 0861",
      coordinates: {
        latitude: 14.607184,
        longtitude: 121.020384,
      },
      stock: [
        {
          type: "O+",
          available: true,
        },
        {
          type: "O-",
          available: true,
        },
        {
          type: "A+",
          available: true,
        },
        {
          type: "A-",
          available: true,
        },
        {
          type: "B+",
          available: true,
        },
        {
          type: "B-",
          available: true,
        },
        {
          type: "AB+",
          available: true,
        },
        {
          type: "AB-",
          available: true,
        },
      ],
    },
    {
      name: "UERM Hospital",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/lifeline-eb7f0.appspot.com/o/hospitalDataLogo%2FGjaJAdRPfST9jKa5Mz9RXCzD7GN2.png?alt=media&token=1abc8b21-edc2-44da-aaf0-a69f6bb8a183",
      address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
      contactNumber: "(02) 8715 0861",
      coordinates: {
        latitude: 14.607184,
        longtitude: 121.020384,
      },
      stock: [
        {
          type: "O+",
          available: true,
        },
        {
          type: "O-",
          available: true,
        },
        {
          type: "A+",
          available: true,
        },
        {
          type: "A-",
          available: true,
        },
        {
          type: "B+",
          available: true,
        },
        {
          type: "B-",
          available: true,
        },
        {
          type: "AB+",
          available: true,
        },
        {
          type: "AB-",
          available: true,
        },
      ],
    },
    {
      name: "UERM Medical",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/lifeline-eb7f0.appspot.com/o/hospitalDataLogo%2FGjaJAdRPfST9jKa5Mz9RXCzD7GN2.png?alt=media&token=1abc8b21-edc2-44da-aaf0-a69f6bb8a183",
      address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
      contactNumber: "(02) 8715 0861",
      coordinates: {
        latitude: 14.607184,
        longtitude: 121.020384,
      },
      stock: [
        {
          type: "O+",
          available: true,
        },
        {
          type: "O-",
          available: true,
        },
        {
          type: "A+",
          available: true,
        },
        {
          type: "A-",
          available: true,
        },
        {
          type: "B+",
          available: true,
        },
        {
          type: "B-",
          available: true,
        },
        {
          type: "AB+",
          available: true,
        },
        {
          type: "AB-",
          available: true,
        },
      ],
    },
  ],
};

export const hospitalsSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    createHospital: (state, action: PayloadAction<HospitalState>) => {
      const { name } = action.payload;
      const hospitalIndex = state.hospitals.findIndex(
        (hospital) => hospital.name === name
      );

      if (hospitalIndex !== -1) {
        state.hospitals.push(action.payload);
      }
    },
  },
  // reducers: {
  //   createQuestion: (
  //     state,
  //     action: PayloadAction<{ title: string; newQuestion: QuestionState }>
  //   ) => {
  //     const { title, newQuestion } = action.payload;
  //     const { question, answer } = newQuestion;
  //     const faqIndex = state.faqs.findIndex((faq) => faq.title === title);

  //     if (faqIndex !== -1) {
  //       state.faqs[faqIndex].questions.push({ question, answer });
  //     } else {
  //       state.faqs.push({ title, questions: [{ question, answer }] });
  //     }
  //   },
  //   updateQuestion: (
  //     state,
  //     action: PayloadAction<{
  //       title: string;
  //       oldQuestion: QuestionState;
  //       updatedQuestion: QuestionState;
  //     }>
  //   ) => {
  //     const { title, oldQuestion, updatedQuestion } = action.payload;
  //     const { question, answer } = updatedQuestion;
  //     const faqIndex = state.faqs.findIndex((faq) => faq.title === title);

  //     if (faqIndex !== -1) {
  //       const questionIndex = state.faqs[faqIndex].questions.findIndex(
  //         (q) => q.question === oldQuestion.question
  //       );

  //       if (questionIndex !== -1) {
  //         state.faqs[faqIndex].questions[questionIndex] = {
  //           question,
  //           answer,
  //         };
  //       }
  //     }
  //   },
  //   deleteQuestion: (
  //     state,
  //     action: PayloadAction<{ title: string; deletedQuestion: QuestionState }>
  //   ) => {
  //     const { title, deletedQuestion } = action.payload;
  //     const faq = state.faqs.find((faq) => faq.title === title);
  //     if (faq) {
  //       faq.questions = faq.questions.filter(
  //         (q) =>
  //           q.question !== deletedQuestion.question ||
  //           q.answer !== deletedQuestion.answer
  //       );
  //     }
  //   },
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(getFAQs.fulfilled, (state, action) => {
  //     if (action.payload) {
  //       state.faqs = action.payload;
  //     } else {
  //       state.faqs = initialState.faqs;
  //     }
  //   });
  // },
});

export const {} = hospitalsSlice.actions;

export const selectCount = (state: RootState) => state.hospitals;

export default hospitalsSlice.reducer;
