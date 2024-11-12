import { useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../constants";
import IconBtn from "components/common/IconButton";
import { router } from "expo-router";
import { FIRESTORE_DB, FIREBASE_AUTH } from "firebase-config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import Divider from "constants/divider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

interface TicketState {
  id: string;
  patientName: string;
  status: "pending" | "rejected" | "accepted" | "cancelled";
  userId: string;
  userEmail: string;
  contactNumber?: string;
  emergencyReason?: string;
  imageUrl?: string;
  isEmergency?: boolean;
  message?: string;
  packedRequest?: boolean;
  packedRequestInfo?: string;
  selectedBloodType?: string;
  selectedRelationship?: string;
  type: "request";
  // Add other properties as needed
}

interface TicketData {
  userId: string;
  status?: "pending" | "rejected" | "accepted" | "cancelled";
  message?: string;
  patientName?: string;
  contactNumber?: string;
  emergencyReason?: string;
  imageUrl?: string;
  isEmergency?: boolean;
  packedRequest?: boolean;
  packedRequestInfo?: string;
  selectedBloodType?: string;
  selectedRelationship?: string;
  type: "request";
  // Add other properties as needed
}

interface CardProps {
  ticket: TicketState;
}

export default function ManageTicketsRequests() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Requests",
      headerTintColor: "#000000",
      headerTitleStyle: {
        fontSize: 16,
      },
      headerTitleAlign: "center",
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Tab.Screen name="Pending" component={ManageTicketsRequestsPending} />
      <Tab.Screen name="Archived" component={ManageTicketsRequestsArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsRequestsPending() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const q = query(
        collection(FIRESTORE_DB, "ticketRequest"),
        where("type", "==", "request"),
        where("status", "==", "pending") // Filter by status
      );

      const querySnapshot = await getDocs(q);
      const ticketsData = querySnapshot.docs.map(
        (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnapshot.data() as TicketData;
          const ticket = {
            id: docSnapshot.id,
            patientName: data.patientName ?? "Unknown",
            status: data.status ?? "pending",
            userId: data.userId,
            contactNumber: data.contactNumber,
            emergencyReason: data.emergencyReason,
            imageUrl: data.imageUrl,
            isEmergency: data.isEmergency,
            message: data.message,
            packedRequest: data.packedRequest,
            packedRequestInfo: data.packedRequestInfo,
            selectedBloodType: data.selectedBloodType,
            selectedRelationship: data.selectedRelationship,
            type: "request",
            // Map other properties as needed
          } as TicketState;

          return ticket;
        }
      );

      // Sort tickets based on isEmergency field
      ticketsData.sort(
        (a, b) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0)
      );

      setTickets(ticketsData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setError("Failed to load tickets");
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

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
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Pending Requests:
        </Text>
      </View>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginVertical: 5 }}>
        Click tickets to view more details.
      </Text>
      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      <FlatList
        data={tickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

function ManageTicketsRequestsArchived() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    try {
      const q = query(
        collection(FIRESTORE_DB, "ticketRequest"),
        where("type", "==", "request")
      );

      const querySnapshot = await getDocs(q);
      const ticketsData = querySnapshot.docs.map(
        (docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnapshot.data() as TicketData;
          const ticket = {
            id: docSnapshot.id,
            patientName: data.patientName ?? "Unknown",
            status: data.status ?? "pending",
            userId: data.userId,
            contactNumber: data.contactNumber,
            emergencyReason: data.emergencyReason,
            imageUrl: data.imageUrl,
            isEmergency: data.isEmergency,
            message: data.message,
            packedRequest: data.packedRequest,
            packedRequestInfo: data.packedRequestInfo,
            selectedBloodType: data.selectedBloodType,
            selectedRelationship: data.selectedRelationship,
            type: "request",
            // Map other properties as needed
          } as TicketState;

          return ticket;
        }
      );

      // Sort tickets based on isEmergency field
      ticketsData.sort(
        (a, b) => (b.isEmergency ? 1 : 0) - (a.isEmergency ? 1 : 0)
      );

      setTickets(ticketsData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setError("Failed to load tickets");
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTickets();
  };

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

  const rejectedTickets = tickets.filter(
    (ticket) => ticket.status === "rejected"
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Archived Requests:
        </Text>
      </View>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginVertical: 5 }}>
        Click tickets to view more details.
      </Text>
      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        Rejected Requests:
      </Text>
      <FlatList
        data={rejectedTickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export function Card({ ticket }: CardProps) {
  const handlePress = () => {
    router.push({
      pathname: "(app)/(admin)/(home)/manage-ticket-request-review",
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
        {ticket.status === "cancelled" && (
          <IconBtn icon="user-xmark" size={18} color="red" />
        )}
        {ticket.status === "accepted" && (
          <IconBtn icon="user-check" size={18} color="green" />
        )}
        {ticket.status === "rejected" && (
          <IconBtn icon="user-times" size={18} color="black" />
        )}
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={card.name}>{ticket.patientName}</Text>
          <Text style={card.text}> {ticket.contactNumber}</Text>
          <Text style={card.text}> {ticket.selectedBloodType}</Text>
        </View>
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
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    height: 50,
    width: 150,
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
    color: COLORS.primary,
  },
  text: {
    fontSize: 14,
  },
});
