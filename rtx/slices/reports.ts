import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { FIRESTORE_DB } from "firebase-config";
import {
  addDoc,
  collection,
  getDocs,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import moment from "moment";

export const getHospitalReports = createAsyncThunk(
  "reports/getHospitalReports",
  async (hospitalName: string) => {
    try {
      const { year, month, week, date } = {
        year: moment().format("YYYY"),
        month: moment().format("MMM"),
        week: moment().format("W"),
        date: moment().format("YYYY-MM-DD"),
      };
      const reportsRef = collection(FIRESTORE_DB, "reports");
      const snapshot = await getDocs(
        query(reportsRef, where("hospitalName", "==", hospitalName))
      );
      if (snapshot.empty) return initialState;
      const docData = snapshot.docs[0].data();
      return {
        hospitalName: docData.hospitalName,
        yearly: docData.yearly?.[year] ?? { donations: 0, requests: 0 },
        monthly: docData.monthly?.[year]?.[month] ?? {
          donations: 0,
          requests: 0,
        },
        weekly: docData.weekly?.[year]?.[week] ?? { donations: 0, requests: 0 },
        daily: docData.daily?.[year]?.[date] ?? { donations: 0, requests: 0 },
      };
    } catch (error) {
      console.error("Error fetching hospital reports:", error);
      return initialState;
    }
  }
);

export const incrementHospitalReports = async (
  hospitalName: string,
  isDonation = true
) => {
  try {
    const reportsRef = collection(FIRESTORE_DB, "reports");
    const snapshot = await getDocs(
      query(reportsRef, where("hospitalName", "==", hospitalName))
    );
    const docRef = snapshot.empty
      ? await addDoc(reportsRef, { hospitalName })
      : snapshot.docs[0].ref;
    const batch = writeBatch(FIRESTORE_DB);
    const field = isDonation ? "donations" : "requests";
    const { year, month, week, date, day } = {
      year: moment().format("YYYY"),
      month: moment().format("MMM"),
      week: moment().format("W"),
      date: moment().format("YYYY-MM-DD"),
      day: moment().format("ddd"),
    };
    batch.update(docRef, {
      [`yearly.${year}.${field}`]: increment(1),
      [`monthly.${year}.${month}.${field}`]: increment(1),
      [`weekly.${year}.${week}.${field}`]: increment(1),
      [`daily.${year}.${date}.${field}`]: increment(1),
    });
    await batch.commit();
    console.log(`Incremented ${field} count for ${hospitalName}.`);
  } catch (error) {
    console.error("Error incrementing report counts:", error);
  }
};

export interface ReportsState {
  hospitalName: string;
  yearly: Record<string, { donations: number; requests: number }>;
  monthly: Record<
    string,
    Record<string, { donations: number; requests: number }>
  >;
  weekly: Record<
    string,
    Record<string, { donations: number; requests: number }>
  >;
  daily: Record<
    string,
    Record<string, { donations: number; requests: number }>
  >;
}

const initialState: ReportsState = {
  hospitalName: "",
  yearly: {},
  monthly: {},
  weekly: {},
  daily: {},
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    incrementDonation: (state) => updateReportCounts(state, "donations"),
    incrementRequest: (state) => updateReportCounts(state, "requests"),
  },
  extraReducers: (builder) => {
    builder.addCase(getHospitalReports.fulfilled, (state, { payload }) => {
      Object.assign(state, payload);
    });
  },
});

const updateReportCounts = (
  state: ReportsState,
  field: "donations" | "requests"
) => {
  const { year, month, week, date, day } = {
    year: moment().format("YYYY"),
    month: moment().format("MM"),
    week: moment().isoWeek().toString(),
    date: moment().format("YYYY-MM-DD"),
    day: moment().format("dddd"),
  };

  state.yearly[year] = state.yearly[year] || { donations: 0, requests: 0 };
  state.monthly[year] = state.monthly[year] || {};
  state.monthly[year][month] = state.monthly[year][month] || {
    donations: 0,
    requests: 0,
  };
  state.weekly[year] = state.weekly[year] || {};
  state.weekly[year][week] = state.weekly[year][week] || {
    donations: 0,
    requests: 0,
  };
  state.daily[year] = state.daily[year] || {};
  state.daily[year][date] = state.daily[year][date] || {
    day,
    donations: 0,
    requests: 0,
  };
  state.yearly[year][field]++;
  state.monthly[year][month][field]++;
  state.weekly[year][week][field]++;
  state.daily[year][date][field]++;
};

export const { incrementDonation, incrementRequest } = reportsSlice.actions;
export const selectReports = (state: RootState) => state.reports;
export default reportsSlice.reducer;
