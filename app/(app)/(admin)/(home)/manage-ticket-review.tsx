import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { useLocalSearchParams } from "expo-router";

interface TicketState {
  id: string;
  name: string;
  status: "pending" | "rejected" | "accepted" | "denied";
  userUID: string;
  userEmail: string;
  age?: number;
  avatarUrl?: string;
  city?: string;
  contactDetails?: string;
  displayName?: string;
  sex?: string;
  message?: string;
  selectedDate?: string;
  selectedHospital?: string;
  selectedTime?: string;
  ticketNumber?: string;
  type?: string;
  checklistData?: { [key: string]: string }; // Add checklistData as an optional property
  // Add other properties as needed
}

export default function ManageTicketReview() {
  const { ticket } = useLocalSearchParams();
  const [ticketData, setTicketData] = useState<TicketState | null>(null);

  useEffect(() => {
    if (ticket) {
      setTicketData(JSON.parse(ticket as string)); // Deserialize the ticket data
    }
  }, [ticket]);

  if (!ticketData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(ticketData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 24 }}>
        Ticket Details
      </Text>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.grayMid,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: COLORS.primary, fontWeight: "bold" }}>
          Ticket Number: {ticketData.ticketNumber}
        </Text>
        <Text>Date: {ticketData.selectedDate} </Text>
        <Text>Time: {ticketData.selectedTime}</Text>
        <Text>Status: {ticketData.status}</Text>
        <Text>Type: {ticketData.type}</Text>
      </View>
      <View>
        <Text
          style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 18 }}
        >
          User Details
        </Text>
        <Text>Name: {ticketData.name}</Text>
        <Text>City: {ticketData.city}</Text>
        <Text>Contact Details: {ticketData.contactDetails}</Text>
        <Text>Sex: {ticketData.sex}</Text>
        <Text>Age: {ticketData.age}</Text>
        <Text>User Email: {ticketData.userEmail}</Text>
      </View>

      {/* Render checklistData */}
      <ScrollView style={styles.checklistContainer}>
        <Text style={styles.checklistTitle}>Checklist Data:</Text>
        {Object.entries(ticketData.checklistData).map(([key, value]) => (
          <View key={key} style={styles.checklistItem}>
            <Text style={styles.checklistKey}>{key}</Text>
            <Text style={styles.checklistValue}>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    padding: 20,
  },
  checklistContainer: {
    marginTop: 20,
    width: "100%",
  },
  checklistTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  checklistItem: {
    marginBottom: 10,
  },
  checklistKey: {
    fontWeight: "bold",
  },
  checklistValue: {
    marginLeft: 10,
  },
});
