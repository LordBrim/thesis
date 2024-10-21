import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

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
  // user: null,
  // TODO: Create a Firebase API layer to get the current user on login.
  user: {
    displayName: "Andrei",
    email: "andrei@mail.com",
    password: "123456",
    role: "super",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;
