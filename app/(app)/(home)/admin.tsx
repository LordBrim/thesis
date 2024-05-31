import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { router } from "expo-router";
import ActionBtn from "components/home/ActionBtn";
// Import your Firebase config
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../../firebase-config";
import AdminDonate from "./admin-donate";

export default function AdminTicketScreen() {
  const auth = getAuth();
  const db = getFirestore();
  const [adminHospital, setAdminHospital] = useState("");
  const [appointments, setAppointments] = useState([]);
  interface Appointment {
    id: string;
    selectedDate: string;
  }
  useEffect(() => {
    // Get the user document from the "User" collection based on the logged-in user's email
    const fetchUser = async () => {
      const userCollectionRef = collection(db, "User");
      const q = query(
        userCollectionRef,
        where("email", "==", auth.currentUser.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.role === "admin") {
          setAdminHospital(userData.hospitalName);
        }
      });
    };

    fetchUser();
    console.log("Admin Hospital:", adminHospital);
    // Clean up the listener when the component unmounts
    return () => {};
  }, []);

  useEffect(() => {
    const fetchticketDonates = async () => {
      try {
        // Get all ticket requests for the logged-in admin's hospital
        const q = query(
          collection(db, "ticketDonate"),
          where("selectedHospital", "==", adminHospital),
          where("status", "==", "accepted")
        );
        const querySnapshot = await getDocs(q);

        const ticketData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[];

        // Get current date in "yyyy-mm-dd" format
        const currentDate = new Date().toISOString().split("T")[0];

        // Filter appointments based on the current date
        const filteredAppointments = ticketData.filter(
          (appointment) => appointment.selectedDate === currentDate
        );

        setAppointments(filteredAppointments);
      } catch (error) {
        console.error("Error fetching ticket requests:", error);
        Alert.alert("Error", "Failed to load ticket requests.");
      }
    };

    if (adminHospital) {
      fetchticketDonates();
    }
  }, [adminHospital]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const hospitalImages = {
    "UERM Hospital": require("../../../assets/images/hospital/uerm.png"),
    "Quirino Memorial Medical Center": require("../../../assets/images/hospital/quirino.png"),
    "Our Lady of Lourdes Hospital": require("../../../assets/images/hospital/lourdes.png"),
    "De los Santos Medical Center": require("../../../assets/images/hospital/santos.png"),
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          borderWidth: 1,
          padding: 6,
          borderRadius: 10,
          margin: 10,
        }}
      >
        <Image
          source={hospitalImages[adminHospital]}
          style={{ width: 60, height: 60, marginRight: 12 }}
        />
        <Text style={[styles.noRequests, { fontWeight: "bold" }]}>
          {adminHospital}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <ActionBtn
          href="/(app)/(home)/admin-donate"
          title="Check Donation Appointment"
          subtitle="Review appointments"
          cta
        />
        <ActionBtn
          href="/(app)/(home)/admin-request"
          title="Check Request Tickets"
          subtitle="Check all pending tickets."
          cta
        />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20, margin: 15 }}>
        Appointments For Today:
      </Text>
      <View style={{ flexDirection: "column" }}>
        {appointments.map((appointment) => (
          <View
            key={appointment.id}
            style={{ borderWidth: 1, borderRadius: 3, margin: 10, padding: 10 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {appointment.ticketNumber} - {appointment.selectedDate}{" "}
              {appointment.selectedTime}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  content: {
    gap: 20,
  },
  noRequests: {
    textAlign: "center",
    fontSize: 18,
  },
  label: {
    fontWeight: "bold",
  },
  value: {},
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4CAF50", // Green
    padding: 10,
    borderRadius: 5,
    width: "40%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f00",
    padding: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
