import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../rtx/slices/user";
import faqsSlice from "rtx/slices/faq";

export const store = configureStore({
  reducer: {
    user: userSlice,
    faqs: faqsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
