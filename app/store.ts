import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../rtx/slices/user";
import staffSlice from "../rtx/slices/staff";
import adminsSlice from "../rtx/slices/admins";
import faqsSlice from "rtx/slices/faq";
import hospitalsSlice from "rtx/slices/hospitals";

export const store = configureStore({
  reducer: {
    user: userSlice,
    staff: staffSlice,
    admins: adminsSlice,
    faqs: faqsSlice,
    hospitals: hospitalsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
