import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const getAllStaff = createAsyncThunk<StaffState["staff"], void>(
  "getAllStaff",
  async () => {
    try {
      const staffQuery = query(
        collection(FIRESTORE_DB, "User"),
        where("role", "==", "staff")
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

export const deleteStaffInFirebase = async (uuid: string) => {
  try {
    const userCollectionRef = collection(FIRESTORE_DB, "User");
    const staffQuery = query(
      userCollectionRef,
      where("role", "==", "staff"),
      where("uuid", "==", uuid)
    );
    const querySnapshot = await getDocs(staffQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting staff:", error);
  }
};

export const disableStaffInFirebase = async (
  uuid: string,
  disabled: boolean
) => {
  try {
    const userDocRef = doc(FIRESTORE_DB, "User", uuid);
    await updateDoc(userDocRef, { disabled });

    console.log(`Staff with UUID ${uuid} updated with disabled = ${disabled}`);
  } catch (error) {
    console.error("Error updating staff disabled status:", error);
  }
};

interface StaffMember {
  uuid?: string;
  disabled: boolean;
  displayName: string;
  email: string;
  password: string;
  role: "user" | "staff" | "admin" | "super";
  hospitalName: string;
}

interface StaffState {
  staff: StaffMember[];
}
const initialState: StaffState = {
  staff: [
    {
      uuid: "dOpturiUmjxzWMhFf7Qv",
      disabled: false,
      displayName: "Andrei Sager",
      email: "andrei@mail.com",
      password: "123456",
      role: "staff",
      hospitalName: "UERM Medical Hospital",
    },
    {
      uuid: "wLBJcMvAmdONhDpQSlGbbXsL3KS2",
      disabled: false,
      displayName: "Angelo Munar",
      email: "angelo@mail.com",
      password: "123456",
      role: "staff",
      hospitalName: "UERM Medical Hospital",
    },
  ],
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    createStaff: (
      state,
      { payload: { newStaff } }: PayloadAction<{ newStaff: StaffMember }>
    ) => {
      const existingStaff = state.staff.find(
        (staff) => staff.email === newStaff.email
      );
      if (existingStaff) {
        Object.assign(existingStaff, newStaff);
      } else {
        state.staff.push(newStaff);
      }
    },
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
    disableStaff: (
      state,
      action: PayloadAction<{ uuid: string; disabled: boolean }>
    ) => {
      const { uuid, disabled } = action.payload;
      const staff = state.staff.find((staff) => staff.uuid === uuid);
      if (staff) {
        staff.disabled = disabled;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHopitalStaff.fulfilled, (state, action) => {
        if (action.payload && action.payload.length > 0) {
          state.staff = action.payload;
        } else {
          state.staff = initialState.staff;
        }
      })
      .addCase(getAllStaff.fulfilled, (state, action) => {
        state.staff = action.payload;
      });
  },
});

export const { createStaff, disableStaff } = staffSlice.actions;

export const selectCount = (state: RootState) => state.staff;

export default staffSlice.reducer;
