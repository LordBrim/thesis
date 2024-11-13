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
    yearly: [
      // { year: "2018", donations: 12800, requests: 11600 },
      // { year: "2019", donations: 13000, requests: 12000 },
      // { year: "2020", donations: 13500, requests: 12700 },
      // { year: "2021", donations: 14200, requests: 11900 },
      // { year: "2022", donations: 15100, requests: 13800 },
      // { year: "2023", donations: 16300, requests: 14700 },
      // { year: "2024", donations: 0, requests: 0 },
    ],
    monthly: [
      // { month: "Dec", donations: 1780, requests: 1720 },
      // { month: "Jan", donations: 1350, requests: 1270 },
      // { month: "Feb", donations: 1420, requests: 1330 },
      // { month: "Mar", donations: 1280, requests: 1200 },
      // { month: "Apr", donations: 1500, requests: 1450 },
      // { month: "May", donations: 1600, requests: 1550 },
      // { month: "Jun", donations: 1480, requests: 1410 },
      // { month: "Jul", donations: 1750, requests: 1650 },
      // { month: "Aug", donations: 1850, requests: 1700 },
      // { month: "Sep", donations: 1630, requests: 1590 },
      // { month: "Oct", donations: 1900, requests: 1800 },
      // { month: "Nov", donations: 0, requests: 0 },
    ],
    weekly: [
      // { week: "30", donations: 150, requests: 100 },
      // { week: "31", donations: 220, requests: 180 },
      // { week: "32", donations: 190, requests: 150 },
      // { week: "33", donations: 300, requests: 250 },
      // { week: "34", donations: 240, requests: 200 },
      // { week: "35", donations: 430, requests: 80 },
      // { week: "36", donations: 230, requests: 180 },
    ],
    daily: [
      // { date: "2020-07-29", day: "Thu", donations: 30, requests: 20 },
      // { date: "2020-07-31", day: "Fri", donations: 50, requests: 40 },
      // { date: "2020-08-01", day: "Sat", donations: 70, requests: 50 },
      // { date: "2020-08-02", day: "Sun", donations: 60, requests: 30 },
      // { date: "2020-08-03", day: "Mon", donations: 40, requests: 20 },
      // { date: "2020-08-04", day: "Tue", donations: 80, requests: 60 },
      // { date: "2020-08-05", day: "Wed", donations: 90, requests: 70 },
    ],
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
