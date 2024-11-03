import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIRESTORE_DB } from "firebase-config";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const getHospitals = createAsyncThunk("getHospitals", async () => {
  try {
    const hospitalsCollectionRef = collection(FIRESTORE_DB, "hospital");
    const sortedQuery = query(hospitalsCollectionRef, orderBy("name", "asc"));
    const querySnapshot = await getDocs(sortedQuery);
    const hospitals = querySnapshot.docs.map((doc) => ({
      uuid: doc.id, // Document ID
      name: doc.data().name,
      type: doc.data().type,
      address: doc.data().address,
      contactNumber: doc.data().contactNumber,
      logoUrl: doc.data().logoUrl,
      coordinates: {
        latitude: doc.data().coordinates.latitude,
        longitude: doc.data().coordinates.longitude,
      },
      stock: doc.data().stock.map((item) => ({
        available: item.available,
        type: item.type,
      })),
    }));
    return hospitals;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return null;
  }
});

export const addHospitalToFirebase = async (
  name: string,
  address: string,
  contactNumber: string,
  logoUrl: string,
  latitude: number,
  longitude: number,
  stock: { type: string; available: boolean }[]
) => {
  const hospitalsCollectionRef = collection(FIRESTORE_DB, "hospital");
  const existingHospitalQuery = query(
    hospitalsCollectionRef,
    where("name", "==", name)
  );
  const querySnapshot = await getDocs(existingHospitalQuery);
  if (!querySnapshot.empty) {
    const hospitalDocRef = querySnapshot.docs[0].ref;
    await updateDoc(hospitalDocRef, {
      address,
      contactNumber,
      logoUrl,
      coordinates: {
        latitude,
        longitude,
      },
      stock: arrayUnion(...stock),
    });
  } else {
    await addDoc(hospitalsCollectionRef, {
      name,
      address,
      contactNumber,
      logoUrl,
      coordinates: {
        latitude,
        longitude,
      },
      stock,
    });
  }
};

export const updateHospitalByUuid = async (
  uuid: string,
  updatedData: {
    name: string;
    address: string;
    contactNumber: string;
    logoUrl: string;
    coordinates: { latitude: number; longitude: number };
    stock: { type: string; available: boolean }[];
  }
) => {
  try {
    const hospitalDocRef = doc(collection(FIRESTORE_DB, "hospital"), uuid);
    await updateDoc(hospitalDocRef, {
      ...updatedData,
    });
    console.log(`Hospital with UUID ${uuid} updated successfully.`);
  } catch (error) {
    console.error("Error updating hospital:", error);
  }
};

export const deleteHospitalInFirebase = async (uuid: string) => {
  try {
    const hospitalDocRef = doc(FIRESTORE_DB, "hospital", uuid);
    await deleteDoc(hospitalDocRef);
    console.log(`Hospital with ID ${uuid} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting hospital:", error);
  }
};

export const updateHospitalStockByUuid = async (
  uuid: string,
  updatedStock: { type: string; available: boolean }[]
) => {
  try {
    const hospitalDocRef = doc(collection(FIRESTORE_DB, "hospital"), uuid);
    await updateDoc(hospitalDocRef, {
      stock: updatedStock,
    });
    console.log(`Stock for hospital with UUID ${uuid} updated successfully.`);
  } catch (error) {
    console.error("Error updating hospital stock:", error);
  }
};

interface HospitalsState {
  hospitals: Array<HospitalState>;
}

interface HospitalState {
  uuid?: string;
  name: string;
  logoUrl: string;
  address: string;
  contactNumber: string;
  coordinates: CoordinatesState;
  stock: Array<StockState>;
  incentives: IncentiveState;
}

interface CoordinatesState {
  latitude: number;
  longitude: number;
}

interface StockState {
  type: string;
  available: boolean;
}

interface IncentiveState {
  info: string;
  number: number;
  data: Array<IncentiveData>;
}

interface IncentiveData {
  position: number;
  incentive: string;
}

const initialState: HospitalsState = {
  hospitals: [
    {
      uuid: "GjaJAdRPfST9jKa5Mz9RXCzD7GN2",
      name: "UERM Hospital",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/lifeline-eb7f0.appspot.com/o/hospitalDataLogo%2FGjaJAdRPfST9jKa5Mz9RXCzD7GN2.png?alt=media&token=1abc8b21-edc2-44da-aaf0-a69f6bb8a183",
      address: "64 Aurora Blvd, Quezon City, 1113 Metro Manila",
      contactNumber: "(02) 8715 0861",
      coordinates: {
        latitude: 14.607184,
        longitude: 121.020384,
      },
      stock: [
        {
          type: "O+",
          available: true,
        },
        {
          type: "O-",
          available: true,
        },
        {
          type: "A+",
          available: true,
        },
        {
          type: "A-",
          available: true,
        },
        {
          type: "B+",
          available: true,
        },
        {
          type: "B-",
          available: true,
        },
        {
          type: "AB+",
          available: true,
        },
        {
          type: "AB-",
          available: true,
        },
      ],
      incentives: {
        info: 'To obtain "priority" you must have successful donations every 3 months for 1 year.',
        number: 4,
        data: [
          { incentive: '"Priority"', position: 4 },
          { incentive: "T-Shirt", position: 2 },
          { incentive: "Meatloaf", position: 5 },
        ],
      },
    },
  ],
};

export const hospitalsSlice = createSlice({
  name: "hospitals",
  initialState,
  reducers: {
    createHospital: (state, action: PayloadAction<HospitalState>) => {
      const hospitalIndex = state.hospitals.findIndex(
        (hospital) => hospital.name === action.payload.name
      );
      if (hospitalIndex === -1) {
        state.hospitals.push(action.payload);
      }
    },
    updateHospital: (
      state,
      action: PayloadAction<{
        uuid: string;
        updatedHospital: HospitalState;
      }>
    ) => {
      const { uuid, updatedHospital } = action.payload;
      const hospitalIndex = state.hospitals.findIndex(
        (hospital) => hospital.uuid === uuid
      );
      if (hospitalIndex !== -1) {
        state.hospitals[hospitalIndex] = updatedHospital;
      }
    },
    deleteHospital: (state, action: PayloadAction<{ uuid: string }>) => {
      const { uuid } = action.payload;
      const hospitalIndex = state.hospitals.findIndex(
        (hospital) => hospital.uuid === uuid
      );
      if (hospitalIndex !== -1) {
        state.hospitals.splice(hospitalIndex, 1);
      }
    },
    updateHospitalStock: (
      state,
      action: PayloadAction<{
        uuid: string;
        updatedStock: { type: string; available: boolean }[];
      }>
    ) => {
      const { uuid, updatedStock } = action.payload;
      const hospital = state.hospitals.find(
        (hospital) => hospital.uuid === uuid
      );
      if (hospital && hospital.stock.length === updatedStock.length) {
        hospital.stock = hospital.stock.map((stockItem, index) => ({
          ...stockItem,
          available: updatedStock[index].available,
        }));
      }
    },
    updateIncentives: (
      state,
      action: PayloadAction<{
        uuid: string;
        updatedIncentives: IncentiveState;
      }>
    ) => {
      const { uuid, updatedIncentives } = action.payload;
      const hospitalIndex = state.hospitals.findIndex(
        (hospital) => hospital.uuid === uuid
      );
      if (hospitalIndex !== -1) {
        state.hospitals[hospitalIndex].incentives = updatedIncentives;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHospitals.fulfilled, (state, action) => {
      if (action.payload) {
        state.hospitals = action.payload;
      } else {
        state.hospitals = initialState.hospitals;
      }
    });
  },
});

export const {
  createHospital,
  updateHospital,
  deleteHospital,
  updateHospitalStock,
  updateIncentives,
} = hospitalsSlice.actions;

export const selectCount = (state: RootState) => state.hospitals.hospitals;

export default hospitalsSlice.reducer;
