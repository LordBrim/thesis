import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { doc, getDoc } from "firebase/firestore";

export const getCurrentUser = createAsyncThunk("getCurrentUser", async (userUID: string) => {
  try {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      return null;
    }

    const docRef = doc(FIRESTORE_DB, "User", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return docSnap.data() as UserState["user"];
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return null;
  }
});

interface UserState {
  user: {
    displayName: string;
    email: string;
    password: string;
    role: "user" | "staff" | "admin" | "super";
    hospitalName: string;
    incentives: {
      hospitalUuid: string;
      claimed: number;
      timesCompleted: number;
    }[];
  };
}

const initialState: UserState = {
  user: {
    displayName: "",
    email: "",
    password: "",
    role: "user",
    hospitalName: "",
    incentives: [
      {
        hospitalUuid: "GjaJAdRPfST9jKa5Mz9RXCzD7GN2",
        claimed: 3,
        timesCompleted: 3,
      },
    ],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      } else {
        state.user = initialState.user;
      }
    });
  },
});

export const selectCount = (state: RootState) => state.user.user;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
