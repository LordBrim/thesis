// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "app/store";

// export const getLocations = createAsyncThunk("getLocations", async () => {});

// // Define a type for the slice state
// interface UserState {
//   locations: [];
// }

// // Define the initial state using that type
// const initialState: UserState = {
//   locations: [],
// };

// export const locationsSlice = createSlice({
//   name: "locations",
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getLocations.fulfilled, (state, action) => {
//       state.locations = action.payload;
//     });
//   },
// });

// // export const { getUser } = userSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.user.user;

// export default locationsSlice.reducer;
