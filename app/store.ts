import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../rtx/slices/user";
import staffSlice from "../rtx/slices/staff";
import adminsSlice from "../rtx/slices/admins";
import faqsSlice from "rtx/slices/faq";
import hospitalsSlice from "rtx/slices/hospitals";
import reportsSlice from "rtx/slices/reports";
import eventsReducer from "rtx/slices/events";
import ticketsReducer from "rtx/slices/tickets";

export const store = configureStore({
  reducer: {
    user: userSlice,
    staff: staffSlice,
    admins: adminsSlice,
    faqs: faqsSlice,
    hospitals: hospitalsSlice,
    reports: reportsSlice,
    events: eventsReducer,
    tickets: ticketsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
