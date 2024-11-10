interface ReportsState {
  reports: {
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
        donations: number;
        requests: number;
      };
    };
  };
}

const initialState: ReportsState = {
  reports: {
    monthly: [
      { month: "January 2020", donations: 35, requests: 27 },
      { month: "February 2020", donations: 42, requests: 33 },
      { month: "March 2020", donations: 28, requests: 20 },
      { month: "April 2020", donations: 50, requests: 45 },
      { month: "May 2020", donations: 60, requests: 55 },
      { month: "June 2020", donations: 48, requests: 41 },
      { month: "July 2020", donations: 75, requests: 65 },
      { month: "August 2020", donations: 85, requests: 70 },
      { month: "September 2020", donations: 63, requests: 59 },
      { month: "October 2020", donations: 90, requests: 80 },
      { month: "November 2020", donations: 70, requests: 67 },
      { month: "December 2020", donations: 78, requests: 72 },
    ],
    weekly: [
      { week: 30, donations: 15, requests: 10 },
      { week: 31, donations: 22, requests: 18 },
      { week: 32, donations: 19, requests: 15 },
      { week: 33, donations: 30, requests: 25 },
      { week: 34, donations: 24, requests: 20 },
    ],
    daily: {
      "2020-07-29": { donations: 3, requests: 2 },
      "2020-07-31": { donations: 5, requests: 4 },
      "2020-08-01": { donations: 7, requests: 5 },
      "2020-08-02": { donations: 6, requests: 3 },
      "2020-08-03": { donations: 4, requests: 2 },
      "2020-08-04": { donations: 8, requests: 6 },
      "2020-08-05": { donations: 9, requests: 7 },
    },
  },
};
