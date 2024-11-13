import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import moment from "moment";

// TODO: Increment donation
// TODO: Increment request

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
      week: string;
      donations: number;
      requests: number;
    }>;
    daily: Array<{
      date: string;
      day: string;
      donations: number;
      requests: number;
    }>;
  };
}

const initialState: ReportsState = {
  reports: {
    yearly: [],
    monthly: [],
    weekly: [],
    daily: [],
  },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    incrementDonation: (state) => {
      const year = moment().format("YYYY");
      const yearData = state.reports.yearly.find(
        (entry) => entry.year === year
      );
      if (yearData) {
        yearData.donations++;
      } else {
        state.reports.yearly.push({ year, donations: 1, requests: 0 });
      }
      const month = moment().format("MMM");
      const monthData = state.reports.monthly.find(
        (entry) => entry.month === month
      );
      if (monthData) {
        monthData.donations++;
      } else {
        state.reports.monthly.push({ month, donations: 1, requests: 0 });
      }
      const week = moment().format("W");
      const weekData = state.reports.weekly.find(
        (entry) => entry.week === week
      );
      if (weekData) {
        weekData.donations++;
      } else {
        state.reports.weekly.push({ week, donations: 1, requests: 0 });
      }
      const date = moment().format("YYYY-MM-DD");
      const day = moment().format("ddd");
      const dayData = state.reports.daily.find((entry) => entry.date === date);
      if (dayData) {
        dayData.donations++;
      } else {
        state.reports.daily.push({ date, day, donations: 1, requests: 0 });
      }
    },
    incrementRequest: (state) => {
      const year = moment().format("YYYY");
      const yearData = state.reports.yearly.find(
        (entry) => entry.year === year
      );
      if (yearData) {
        yearData.requests++;
      } else {
        state.reports.yearly.push({ year, donations: 0, requests: 1 });
      }
      const month = moment().format("MMM");
      const monthData = state.reports.monthly.find(
        (entry) => entry.month === month
      );
      if (monthData) {
        monthData.requests++;
      } else {
        state.reports.monthly.push({ month, donations: 0, requests: 1 });
      }
      const week = moment().format("W");
      const weekData = state.reports.weekly.find(
        (entry) => entry.week === week
      );
      if (weekData) {
        weekData.requests++;
      } else {
        state.reports.weekly.push({ week, donations: 0, requests: 1 });
      }
      const date = moment().format("YYYY-MM-DD");
      const day = moment().format("ddd");
      const dayData = state.reports.daily.find((entry) => entry.date === date);
      if (dayData) {
        dayData.requests++;
      } else {
        state.reports.daily.push({ date, day, donations: 0, requests: 1 });
      }
    },
  },
});

export const { incrementDonation, incrementRequest } = reportsSlice.actions;

export const selectCount = (state: RootState) => state.reports;

export default reportsSlice.reducer;
