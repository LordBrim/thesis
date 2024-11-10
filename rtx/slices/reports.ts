import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface ReportsState {
  reports: {
    yearly: Array<{
      year: string;
      donations: number;
      requests: number;
    }>;
    monthly: Array<{
      month: string;
      donations: number;
      requests: number;
    }>;
    weekly: Array<{
      week: number;
      donations: number;
      requests: number;
    }>;
    daily: {
      [date: string]: {
        day: string;
        donations: number;
        requests: number;
      };
    };
  };
}

const initialState: ReportsState = {
  reports: {
    yearly: [
      { year: "2020", donations: 35, requests: 27 },
      { year: "2021", donations: 35, requests: 27 },
      { year: "2022", donations: 35, requests: 27 },
      { year: "2023", donations: 35, requests: 27 },
      { year: "2024", donations: 35, requests: 27 },
    ],
    monthly: [
      { month: "Jan", donations: 35, requests: 27 },
      { month: "Feb", donations: 42, requests: 33 },
      { month: "Mar", donations: 28, requests: 20 },
      { month: "Apr", donations: 50, requests: 45 },
      { month: "May", donations: 60, requests: 55 },
      { month: "Jun", donations: 48, requests: 41 },
      { month: "Jul", donations: 75, requests: 65 },
      { month: "Aug", donations: 85, requests: 70 },
      { month: "Sep", donations: 63, requests: 59 },
      { month: "Oct", donations: 90, requests: 80 },
      { month: "Nov", donations: 70, requests: 67 },
      { month: "Dec", donations: 78, requests: 72 },
    ],
    weekly: [
      { week: 30, donations: 15, requests: 10 },
      { week: 31, donations: 22, requests: 18 },
      { week: 32, donations: 19, requests: 15 },
      { week: 33, donations: 30, requests: 25 },
      { week: 34, donations: 24, requests: 20 },
      { week: 35, donations: 43, requests: 8 },
      { week: 36, donations: 23, requests: 18 },
    ],
    daily: {
      "2020-07-29": { day: "T", donations: 3, requests: 2 },
      "2020-07-31": { day: "F", donations: 5, requests: 4 },
      "2020-08-01": { day: "S", donations: 7, requests: 5 },
      "2020-08-02": { day: "S", donations: 6, requests: 3 },
      "2020-08-03": { day: "M", donations: 4, requests: 2 },
      "2020-08-04": { day: "T", donations: 8, requests: 6 },
      "2020-08-05": { day: "W", donations: 9, requests: 7 },
    },
  },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
});

export const {} = reportsSlice.actions;

export const selectCount = (state: RootState) => state.reports;

export default reportsSlice.reducer;
