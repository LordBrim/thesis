import type { RootState } from "../../app/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FIREBASE_AUTH, FIRESTORE_DB } from "firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const getAllAdmins = createAsyncThunk<AdminsState["admins"], void>(
  "getAllAdmins",
  async () => {
    try {
      const adminsQuery = query(
        collection(FIRESTORE_DB, "User"),
        where("role", "==", "admin")
      );
      const querySnapshot = await getDocs(adminsQuery);
      const admins = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        uuid: doc.id,
      })) as AdminsState["admins"];
      return admins;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return [];
    }
  }
);

export const deleteAdminInFirebase = async (uuid: string) => {
  try {
    const userCollectionRef = collection(FIRESTORE_DB, "User");
    const adminsQuery = query(
      userCollectionRef,
      where("role", "==", "admin"),
      where("uuid", "==", uuid)
    );
    const querySnapshot = await getDocs(adminsQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting admins:", error);
  }
};

export const disableAdminsInFirebase = async (
  uuid: string,
  disabled: boolean
) => {
  try {
    const userDocRef = doc(FIRESTORE_DB, "User", uuid);
    await updateDoc(userDocRef, { disabled });
    console.log(`Admins with UUID ${uuid} updated with disabled = ${disabled}`);
  } catch (error) {
    console.error("Error updating admins disabled status:", error);
  }
};

interface AdminsMember {
  uuid?: string;
  disabled: boolean;
  displayName: string;
  email: string;
  password: string;
  role: "user" | "staff" | "admin" | "super";
  hospitalName: string;
}

interface AdminsState {
  admins: AdminsMember[];
}
const initialState: AdminsState = {
  admins: [
    {
      uuid: "dOpturiUmjxzWMhFf7Qv",
      disabled: false,
      displayName: "Andrei Sager",
      email: "andrei@mail.com",
      password: "123456",
      role: "admin",
      hospitalName: "UERM Medical Hospital",
    },
    {
      uuid: "wLBJcMvAmdONhDpQSlGbbXsL3KS2",
      disabled: false,
      displayName: "Angelo Munar",
      email: "angelo@mail.com",
      password: "123456",
      role: "admin",
      hospitalName: "UERM Medical Hospital",
    },
  ],
};

const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    createAdmins: (
      state,
      { payload: { newAdmins } }: PayloadAction<{ newAdmins: AdminsMember }>
    ) => {
      const existingAdmins = state.admins.find(
        (admins) => admins.email === newAdmins.email
      );
      if (existingAdmins) {
        Object.assign(existingAdmins, newAdmins);
      } else {
        state.admins.push(newAdmins);
      }
    },
    disableAdmins: (
      state,
      action: PayloadAction<{ uuid: string; disabled: boolean }>
    ) => {
      const { uuid, disabled } = action.payload;
      const admins = state.admins.find((admins) => admins.uuid === uuid);
      if (admins) {
        admins.disabled = disabled;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAdmins.fulfilled, (state, action) => {
      state.admins = action.payload;
    });
  },
});

export const { createAdmins, disableAdmins } = adminsSlice.actions;

export const selectCount = (state: RootState) => state.admins;

export default adminsSlice.reducer;
