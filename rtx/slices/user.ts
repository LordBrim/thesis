import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import { doc, getDoc } from "firebase/firestore";

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
  try {
    const user = FIREBASE_AUTH.currentUser;

    if (!user) {
      // console.log("No user is currently logged in.");
      return null;
    }

    const docRef = doc(FIRESTORE_DB, "User", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // console.log("User document does not exist.");
      return null;
    }

    // console.log(docSnap.data());
    return docSnap.data() as UserState["user"];
  } catch (error) {
    // console.error("Failed to getCurrentUser.");
    return null;
  }
});

// Define a type for the slice state
interface UserState {
  user: {
    displayName: string;
    email: string;
    password: string;
    role: "user" | "staff" | "admin" | "super";
  };
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    displayName: "",
    email: "",
    password: "",
    role: "user",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload; // Only update the state if data exists
      } else {
        // Handle the case where no user data is found (optional)
        state.user = initialState.user; // Reset to initial state or another appropriate action
      }
    });
  },
});

// export const { getUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;
