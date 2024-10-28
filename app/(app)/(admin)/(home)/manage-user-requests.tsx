import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../constants";
import IconBtn from "components/common/IconButton";
import { router } from "expo-router";
import { FIRESTORE_DB } from "firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

interface TicketRequest {
  contactNumber: string;
  emergencyReason: string;
  imageUrl: string;
  isEmergency: boolean;
  message: string;
  packedRequest: boolean;
  packedRequestInfo: string;
  patientName: string;
  selectedBloodType: string;
  selectedRelationship: string;
  status: "pending" | "rejected" | "accepted";
  type: string;
  userId: string;
}

interface User {
  displayName: string;
  email: string;
  age: number;
  avatarUrl: string;
  city: string;
  contactDetails: string;
  sex: string;
}

interface TicketState {
  id: string;
  name: string;
  status: "pending" | "rejected" | "accepted";
  userUID: string;
  userEmail: string;
  contactNumber: string;
  emergencyReason: string;
  imageUrl: string;
  isEmergency: boolean;
  message: string;
  packedRequest: boolean;
  packedRequestInfo: string;
  patientName: string;
  selectedBloodType: string;
  selectedRelationship: string;
  type: "request";
}

export default function ManageUserRequests() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "ticketRequest")
        );
        const ticketsData = await Promise.all(
          querySnapshot.docs.map(
            async (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
              const data = docSnapshot.data() as TicketRequest;
              try {
                const userDocRef = doc(FIRESTORE_DB, "User", data.userId);
                const userDocSnapshot = await getDoc(userDocRef);
                const userData = userDocSnapshot.exists()
                  ? (userDocSnapshot.data() as User)
                  : ({} as User);

                return {
                  id: docSnapshot.id,
                  name: userData.displayName ?? "Unknown",
                  status: data.status,
                  userUID: data.userId,
                  userEmail: userData.email ?? "Unknown",
                  contactNumber: data.contactNumber,
                  emergencyReason: data.emergencyReason,
                  imageUrl: data.imageUrl,
                  isEmergency: data.isEmergency,
                  message: data.message,
                  packedRequest: data.packedRequest,
                  packedRequestInfo: data.packedRequestInfo,
                  patientName: data.patientName,
                  selectedBloodType: data.selectedBloodType,
                  selectedRelationship: data.selectedRelationship,
                  type: "request",
                } as TicketState;
              } catch (error) {
                console.error(
                  `Error fetching user data for ticket ${docSnapshot.id}:`,
                  error
                );
                return {
                  id: docSnapshot.id,
                  name: "Unknown",
                  status: data.status,
                  userUID: data.userId,
                  userEmail: "Unknown",
                  contactNumber: data.contactNumber,
                  emergencyReason: data.emergencyReason,
                  imageUrl: data.imageUrl,
                  isEmergency: data.isEmergency,
                  message: data.message,
                  packedRequest: data.packedRequest,
                  packedRequestInfo: data.packedRequestInfo,
                  patientName: data.patientName,
                  selectedBloodType: data.selectedBloodType,
                  selectedRelationship: data.selectedRelationship,
                  type: "request",
                } as TicketState;
              }
            }
          )
        );
        setTickets(ticketsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets: ", error);
        setError("Failed to load tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading Tickets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
      />
    </View>
  );
}

export function Card({ ticket }: { ticket: TicketState }) {
  const handlePress = () => {
    router.push({
      pathname: "(app)/(admin)/(home)/manage-ticket-review",
      params: {
        ticket: JSON.stringify(ticket), // Serialize the ticket data
      },
    });
  };

  return (
    <Pressable
      style={card.container}
      android_ripple={{ radius: 250 }}
      onPress={handlePress}
    >
      <View
        style={{
          flexShrink: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        {ticket.status === "pending" && (
          <IconBtn icon="user-minus" size={18} color="gray" />
        )}
        {ticket.status === "rejected" && (
          <IconBtn icon="user-xmark" size={18} color="red" />
        )}
        {ticket.status === "accepted" && (
          <IconBtn icon="user-check" size={18} color="green" />
        )}
        <Text style={card.name}>{ticket.name}</Text>
      </View>
      <IconBtn icon="angle-right" size={18} onPress={handlePress} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  },
  name: {
    minWidth: "78%",
    fontWeight: "bold",
  },
});
