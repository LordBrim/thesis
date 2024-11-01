import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getHopitalStaff = createAsyncThunk<
  StaffState["staff"], // Return type
  string // Argument type (hospitalName)
>("getHopitalStaff", async (hospitalName) => {
  try {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      return []; // Return empty array if no user
    }

    const staffQuery = query(
      collection(FIRESTORE_DB, "User"),
      where("role", "==", "staff"),
      where("hospitalName", "==", hospitalName)
    );

    const querySnapshot = await getDocs(staffQuery);

    const staff = querySnapshot.docs.map(
      (doc) => doc.data() as StaffState["staff"][0]
    );

    return staff;
  } catch (error) {
    console.error("Error fetching staff:", error);
    return []; // Return empty array on error
  }
});

interface StaffState {
  staff: {
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
      displayName: "Andrei Sager",
      email: "andrei@mail.com",
      password: "123456",
      role: "staff",
      hospitalName: "STI Sta. Mesa",
    },
    {
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
  reducers: {},
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
