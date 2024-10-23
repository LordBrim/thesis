import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { getCurrentUser } from "rtx/fbActions/getCurrentUser";

// Define a type for the slice state
interface UserState {
  user: {
    displayName: string;
    email: string;
    password: string;
    role: "" | "user" | "staff" | "admin" | "super";
  };
}

// Define the initial state using that type
const initialState: UserState = {
  user: {
    displayName: "",
    email: "",
    password: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // setUser: (state, action) => {
    //   state.user.displayName = action.payload.displayName;
    //   state.user.email = action.payload.email;
    //   state.user.password = action.payload.password;
    //   state.user.role = action.payload.role;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
      state.user.role = action.payload.role;
    });
  },
});

// export const { getUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;
