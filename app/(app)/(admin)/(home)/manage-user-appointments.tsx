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
  type: "donate";
  checklistData?: { [key: string]: string }; // Add checklistData as an optional property
  // Add other properties as needed
}

interface UserData {
  displayName?: string;
  email?: string;
  age?: number;
  avatarUrl?: string;
  city?: string;
  contactDetails?: string;
  sex?: string;
  // Add other properties as needed
}

interface TicketData {
  userUID: string;
  status?: "pending" | "rejected" | "accepted" | "denied";
  message?: string;
  selectedDate?: string;
  selectedHospital?: string;
  selectedTime?: string;
  ticketNumber?: string;
  type: "donate";
  checklistData?: any;
  // Add other properties as needed
}

interface CardProps {
  ticket: TicketState;
}

export default function ManageUserAppointments() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(FIRESTORE_DB, "ticketDonate")
        );
        const ticketsData = await Promise.all(
          querySnapshot.docs.map(
            async (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
              const data = docSnapshot.data() as TicketData;
              try {
                const userDocRef = doc(FIRESTORE_DB, "User", data.userUID);
                const userDocSnapshot = await getDoc(userDocRef);
                const userData = userDocSnapshot.exists()
                  ? (userDocSnapshot.data() as UserData)
                  : ({} as UserData);

                return {
                  id: docSnapshot.id,
                  name: userData.displayName ?? "Unknown",
                  status: data.status ?? "pending",
                  userUID: data.userUID,
                  userEmail: userData.email ?? "Unknown",
                  age: userData.age,
                  avatarUrl: userData.avatarUrl,
                  city: userData.city,
                  contactDetails: userData.contactDetails,
                  displayName: userData.displayName,
                  sex: userData.sex,
                  message: data.message,
                  selectedDate: data.selectedDate,
                  selectedHospital: data.selectedHospital,
                  selectedTime: data.selectedTime,
                  ticketNumber: data.ticketNumber,
                  type: "donate",
                  checklistData: data.checklistData,
                  // Map other properties as needed
                } as TicketState;
              } catch (error) {
                console.error(
                  `Error fetching user data for ticket ${docSnapshot.id}:`,
                  error
                );
                return {
                  id: docSnapshot.id,
                  name: "Unknown",
                  status: data.status ?? "pending",
                  userUID: data.userUID,
                  userEmail: "Unknown",
                  type: "donate",
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
      <View style={styles.centeredContainer}>
        <Text>Loading Tickets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
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

export function Card({ ticket }: CardProps) {
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
        {ticket.status === "denied" && (
          <IconBtn icon="user-times" size={18} color="black" />
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
  centeredContainer: {
    flex: 1,
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
