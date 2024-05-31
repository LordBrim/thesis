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

export default function AdminDonate() {
  const [ticketDonates, setticketDonates] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const [adminHospital, setAdminHospital] = useState("");

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
          where("selectedHospital", "==", adminHospital)
        );
        const querySnapshot = await getDocs(q);

        const ticketData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setticketDonates(ticketData);
      } catch (error) {
        console.error("Error fetching ticket requests:", error);
        Alert.alert("Error", "Failed to load ticket requests.");
      }
    };

    if (adminHospital) {
      fetchticketDonates();
    }
  }, [adminHospital]);

  const handleAccept = async (ticketId) => {
    try {
      // Update the ticket request status to "accepted"
      const ticketDocRef = doc(db, "ticketDonate", ticketId);
      await updateDoc(ticketDocRef, { status: "accepted" });
      Alert.alert("Success", "Ticket request accepted.");
      // You might want to refresh the list here
    } catch (error) {
      console.error("Error accepting ticket request:", error);
      Alert.alert("Error", "Failed to accept ticket request.");
    }
  };

  const handleReject = async (ticketId) => {
    try {
      // Update the ticket request status to "rejected"
      const ticketDocRef = doc(db, "ticketDonate", ticketId);
      await updateDoc(ticketDocRef, { status: "rejected" });
      Alert.alert("Success", "Ticket request rejected.");
      // You might want to refresh the list here
    } catch (error) {
      console.error("Error rejecting ticket request:", error);
      Alert.alert("Error", "Failed to reject ticket request.");
    }
  };
  return (
    <>
      <Text style={styles.noRequests}>
        Pending Ticket Requests: {ticketDonates.length}
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        {ticketDonates.length === 0 && (
          <Text style={styles.noRequests}>No pending ticket requests.</Text>
        )}

        {ticketDonates.map((request) => (
          <View key={request.id} style={styles.requestItem}>
            <View style={styles.requestDetails}>
              <Text style={styles.label}>Ticket Number:</Text>
              <Text style={styles.value}>{request.ticketNumber}</Text>
            </View>
            <View style={styles.requestDetails}>
              <Text style={styles.label}>Hospital:</Text>
              <Text style={styles.value}>{request.selectedHospital}</Text>
            </View>
            <View style={styles.requestDetails}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{request.selectedDate}</Text>
            </View>
            <View style={styles.requestDetails}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{request.selectedTime}</Text>
            </View>
            <View style={styles.requestDetails}>
              <Text style={styles.label}>User Email:</Text>
              <Text style={styles.value}>{request.userEmail}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAccept(request.id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleReject(request.id)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
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
  requestItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 8,
    margin: 15,
  },
  requestDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
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
