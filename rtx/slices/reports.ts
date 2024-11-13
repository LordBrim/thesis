import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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

// Async action to fetch hospital reports
export const getHospitalReports = createAsyncThunk<
  ReportsState["reports"][], // Data type to return
  string // hospitalName type
>("getHospitalReports", async (hospitalName) => {
  try {
    const reportsCollectionRef = collection(FIRESTORE_DB, "reports");
    const filteredQuery = query(
      reportsCollectionRef,
      where("hospitalName", "==", hospitalName)
    );
    const querySnapshot = await getDocs(filteredQuery);

    const reports = querySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        hospitalName: docData.hospitalName,
        yearly: docData.yearly || [],
        monthly: docData.monthly || { year: "", data: [] },
        weekly: docData.weekly || { year: "", data: [] },
        daily: docData.daily || { year: "", data: [] },
      } as ReportsState["reports"];
    });

    return reports;
  } catch (error) {
    console.error("Error fetching hospital reports:", error);
    return [];
  }
});

// Async action to increment donation or request counts
export const incrementHospitalReports = async (
  hospitalName: string,
  isDonation: boolean = true // If true, increment donations; if false, increment requests
) => {
  try {
    const reportsCollectionRef = collection(FIRESTORE_DB, "reports");

    // Query to find the specific hospital report
    const filteredQuery = query(
      reportsCollectionRef,
      where("hospitalName", "==", hospitalName)
    );
    const querySnapshot = await getDocs(filteredQuery);

    let reportDocRef;

    // If no report found, create a new one
    if (querySnapshot.empty) {
      console.log("No report found for this hospital. Creating a new one.");

      // Use Moment.js to get current date details
      const now = moment();
      const year = now.format("YYYY");
      const month = now.format("MM");
      const week = now.isoWeek().toString(); // ISO week of the year
      const date = now.format("YYYY-MM-DD");
      const day = now.format("dddd");

      // Create initial report data
      const newReportData = {
        hospitalName,
        yearly: {
          [year]: { donations: 0, requests: 0 },
        },
        monthly: {
          [year]: {
            data: {
              [month]: { donations: 0, requests: 0 },
            },
          },
        },
        weekly: {
          [year]: {
            data: {
              [week]: { donations: 0, requests: 0 },
            },
          },
        },
        daily: {
          [year]: {
            data: {
              [date]: { donations: 0, requests: 0, day },
            },
          },
        },
      };

      // Add the new report to Firestore
      const newReportRef = await addDoc(reportsCollectionRef, newReportData);
      reportDocRef = newReportRef;
    } else {
      // If the report exists, use the existing reference
      reportDocRef = querySnapshot.docs[0].ref;
    }

    // Initialize batch operation
    const batch = writeBatch(FIRESTORE_DB);

    // Field to increment: donations or requests
    const field = isDonation ? "donations" : "requests";

    // Increment values
    batch.update(reportDocRef, {
      [`yearly.${moment().format("YYYY")}.${field}`]: increment(1),
      [`monthly.${moment().format("YYYY")}.data.${moment().format(
        "MM"
      )}.${field}`]: increment(1),
      [`weekly.${moment().format("YYYY")}.data.${moment().isoWeek()}.${field}`]:
        increment(1),
      [`daily.${moment().format("YYYY")}.data.${moment().format(
        "YYYY-MM-DD"
      )}.${field}`]: increment(1),
    });

    // Commit batch
    await batch.commit();

    console.log(
      `${isDonation ? "Donation" : "Request"} count incremented successfully.`
    );
  } catch (error) {
    console.error("Error incrementing report counts:", error);
  }
};

// Type for the report state
interface ReportsState {
  reports: {
    hospitalName: string;
    yearly: Array<{
      year: string;
      donations: number;
      requests: number;
    }>;
    monthly: {
      year: string;
      data: Array<{
        month: string;
        donations: number;
        requests: number;
      }>;
    };
    weekly: {
      year: string;
      data: Array<{
        week: string;
        donations: number;
        requests: number;
      }>;
    };
    daily: {
      year: string;
      data: Array<{
        date: string;
        day: string;
        donations: number;
        requests: number;
      }>;
    };
  };
}

// Initial state setup for reports
const initialState: ReportsState = {
  reports: {
    hospitalName: "",
    yearly: [{ year: "", donations: 0, requests: 0 }],
    monthly: { year: "", data: [{ month: "", donations: 0, requests: 0 }] },
    weekly: { year: "", data: [{ week: "", donations: 0, requests: 0 }] },
    daily: {
      year: "",
      data: [{ date: "", day: "", donations: 0, requests: 0 }],
    },
  },
};

// Redux slice for managing reports state
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
      const monthData = state.reports.monthly.data.find(
        (entry) => entry.month === month
      );
      if (monthData) {
        monthData.donations++;
      } else {
        state.reports.monthly.data.push({ month, donations: 1, requests: 0 });
      }
      const week = moment().format("W");
      const weekData = state.reports.weekly.data.find(
        (entry) => entry.week === week
      );
      if (weekData) {
        weekData.donations++;
      } else {
        state.reports.weekly.data.push({ week, donations: 1, requests: 0 });
      }
      const date = moment().format("YYYY-MM-DD");
      const day = moment().format("ddd");
      const dayData = state.reports.daily.data.find(
        (entry) => entry.date === date
      );
      if (dayData) {
        dayData.donations++;
      } else {
        state.reports.daily.data.push({ date, day, donations: 1, requests: 0 });
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
      const monthData = state.reports.monthly.data.find(
        (entry) => entry.month === month
      );
      if (monthData) {
        monthData.requests++;
      } else {
        state.reports.monthly.data.push({ month, donations: 0, requests: 1 });
      }
      const week = moment().format("W");
      const weekData = state.reports.weekly.data.find(
        (entry) => entry.week === week
      );
      if (weekData) {
        weekData.requests++;
      } else {
        state.reports.weekly.data.push({ week, donations: 0, requests: 1 });
      }
      const date = moment().format("YYYY-MM-DD");
      const day = moment().format("ddd");
      const dayData = state.reports.daily.data.find(
        (entry) => entry.date === date
      );
      if (dayData) {
        dayData.requests++;
      } else {
        state.reports.daily.data.push({ date, day, donations: 0, requests: 1 });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHospitalReports.fulfilled, (state, action) => {
      if (action.payload && action.payload.length > 0) {
        state.reports = action.payload[0]; // Assuming we only fetch one hospital's data
      } else {
        state.reports = initialState.reports;
      }
    });
  },
});

// Export actions
export const { incrementDonation, incrementRequest } = reportsSlice.actions;

// Selector to get reports state
export const selectReports = (state: RootState) => state.reports;

// Default export of the reducer
export default reportsSlice.reducer;
