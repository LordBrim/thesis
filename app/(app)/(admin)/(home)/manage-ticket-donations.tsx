import { useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl, // Add RefreshControl import
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../../../constants";
import IconBtn from "components/common/IconButton";
import { router } from "expo-router";
import { FIRESTORE_DB, FIREBASE_AUTH } from "firebase-config";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Picker } from "@react-native-picker/picker"; // Import Picker from the new package
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
import moment from "moment";
import Divider from "constants/divider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { onAuthStateChanged } from "firebase/auth";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";
const Tab = createMaterialTopTabNavigator();

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
  type: "appointment";
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
  hospitalName?: string;

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
  type: "appointment";
  checklistData?: any;
  isComplete?: boolean;
  // Add other properties as needed
}

interface CardProps {
  ticket: TicketState;
}

export default function ManageTicketsDonations() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Donations",
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
      <Tab.Screen name="Pending" component={ManageTicketsDonationsPending} />
      <Tab.Screen name="Archived" component={ManageTicketsDonationsArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsDonationsPending() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("closest");
  const [refreshing, setRefreshing] = useState(false); // Refresh state

  const [hospitalName, setHospitalName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as UserData;
          setHospitalName(userData.hospitalName ?? null);
          console.log("Hospital Name: ", userData.hospitalName);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTickets = async () => {
    if (!hospitalName) return; // Wait until hospitalName is set
    console.log("Fetching tickets for hospital:", hospitalName); // Debugging log

    try {
      const q = query(
        collection(FIRESTORE_DB, "ticketDonate"),
        where("type", "==", "appointment"),
        where("selectedHospital", "==", hospitalName), // Filter by selectedHospital
        where("status", "==", "pending") // Filter by pending status
      );

      const querySnapshot = await getDocs(q);
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

              const ticket = {
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
                type: "appointment",
                checklistData: data.checklistData,
                isComplete: data.isComplete,
                // Map other properties as needed
              } as TicketState;

              const ticketDate = moment(
                `${ticket.selectedDate} ${ticket.selectedTime}`,
                "YYYY-MM-DD h:mm A"
              );

              if (ticketDate.isAfter(moment())) {
                return ticket;
              } else {
                return null;
              }
            } catch (error) {
              console.error(
                `Error fetching user data for ticket ${docSnapshot.id}:`,
                error
              );
              return null;
            }
          }
        )
      );
      console.log("Fetched tickets:", ticketsData); // Debugging log
      setTickets(
        ticketsData.filter((ticket) => ticket !== null) as TicketState[]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setError("Failed to load tickets");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [hospitalName]);

  useEffect(() => {
    setTickets((prevTickets) => sortTickets(prevTickets, sortOption));
  }, [sortOption]);

  const sortTickets = (tickets: TicketState[], option: string) => {
    return tickets.sort((a, b) => {
      const dateA =
        a.selectedDate && a.selectedTime
          ? moment(`${a.selectedDate} ${a.selectedTime}`, "YYYY-MM-DD h:mm A")
          : null;
      const dateB =
        b.selectedDate && b.selectedTime
          ? moment(`${b.selectedDate} ${b.selectedTime}`, "YYYY-MM-DD h:mm A")
          : null;
      if (!dateA || !dateB || !dateA.isValid() || !dateB.isValid()) {
        console.warn("Invalid date parsing in ticket data.");
        return 0; // No change if parsing fails
      }
      if (option === "closest") {
        return dateA.valueOf() - dateB.valueOf();
      } else {
        return dateB.valueOf() - dateA.valueOf();
      }
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTickets(); // Re-fetch the tickets
    } catch (error) {
      console.error("Error refreshing tickets:", error);
    } finally {
      setRefreshing(false);
    }
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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
          }}
        >
          <CustomButtonWithIcon
            title={"See all appointments"}
            buttonStyle={{
              width: "100%",
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
            icon={"calendar"}
            iconColor={"#fff"}
            iconSize={20}
            onPress={() => {
              router.push({
                pathname: "(app)/(admin)/(home)/manage-ticket-all-appointments",
                params: {
                  tickets: JSON.stringify(tickets), // Serialize the tickets data
                },
              });
            }}
            textStyle={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Pending Appointments:
          </Text>
          <View style={styles.filterContainer}>
            <Picker
              selectedValue={sortOption}
              style={styles.picker}
              onValueChange={(itemValue) => setSortOption(itemValue)}
            >
              <Picker.Item label="Closest" value="closest" />
              <Picker.Item label="Farthest" value="farthest" />
            </Picker>
          </View>
        </View>
      </View>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginVertical: 5 }}>
        Click tickets to view more details.
      </Text>
      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      <FlatList
        data={tickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
      />
    </View>
  );
}

function ManageTicketsDonationsArchived() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("closest");
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const [hospitalName, setHospitalName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        const userDocRef = doc(FIRESTORE_DB, "User", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data() as UserData;
          setHospitalName(userData.hospitalName ?? null);
          console.log("Hospital Name: ", userData.hospitalName);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchTickets = async () => {
    if (!hospitalName) return; // Wait until hospitalName is set
    console.log("Fetching tickets for hospital:", hospitalName); // Debugging log

    try {
      const q = query(
        collection(FIRESTORE_DB, "ticketDonate"),
        where("type", "==", "appointment"),
        where("selectedHospital", "==", hospitalName) // Filter by selectedHospital
      );

      const querySnapshot = await getDocs(q);
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

              const ticket = {
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
                type: "appointment",
                checklistData: data.checklistData,
                isComplete: data.isComplete,
                // Map other properties as needed
              } as TicketState;

              const ticketDate = moment(
                `${ticket.selectedDate} ${ticket.selectedTime}`,
                "YYYY-MM-DD h:mm A"
              );

              if (
                ticketDate.isBefore(moment()) &&
                ticket.status === "pending"
              ) {
                return ticket;
              } else if (
                ticket.status === "denied" ||
                ticket.status === "accepted"
              ) {
                return ticket;
              } else {
                return null;
              }
            } catch (error) {
              console.error(
                `Error fetching user data for ticket ${docSnapshot.id}:`,
                error
              );
              return null;
            }
          }
        )
      );
      setTickets(
        ticketsData.filter((ticket) => ticket !== null) as TicketState[]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets: ", error);
      setError("Failed to load tickets");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [hospitalName]);

  useEffect(() => {
    setTickets((prevTickets) => sortTickets(prevTickets, sortOption));
  }, [sortOption]);

  const sortTickets = (tickets: TicketState[], option: string) => {
    return tickets.sort((a, b) => {
      const dateA =
        a.selectedDate && a.selectedTime
          ? moment(`${a.selectedDate} ${a.selectedTime}`, "YYYY-MM-DD h:mm A")
          : null;
      const dateB =
        b.selectedDate && b.selectedTime
          ? moment(`${b.selectedDate} ${b.selectedTime}`, "YYYY-MM-DD h:mm A")
          : null;
      if (!dateA || !dateB || !dateA.isValid() || !dateB.isValid()) {
        console.warn("Invalid date parsing in ticket data.");
        return 0; // No change if parsing fails
      }
      if (option === "closest") {
        return dateA.valueOf() - dateB.valueOf();
      } else {
        return dateB.valueOf() - dateA.valueOf();
      }
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTickets(); // Re-fetch the tickets
    } catch (error) {
      console.error("Error refreshing tickets:", error);
    } finally {
      setRefreshing(false);
    }
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

  const missedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "pending" &&
      ticket.selectedDate &&
      ticket.selectedTime &&
      moment(
        `${ticket.selectedDate} ${ticket.selectedTime}`,
        "YYYY-MM-DD h:mm A"
      ).isBefore(moment())
  );
  const rejectedTickets = tickets.filter(
    (ticket) => ticket.status === "denied"
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
          Archived Appointments:
        </Text>
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={sortOption}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOption(itemValue)}
          >
            <Picker.Item label="Closest" value="closest" />
            <Picker.Item label="Farthest" value="farthest" />
          </Picker>
        </View>
      </View>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginVertical: 5 }}>
        Click tickets to view more details.
      </Text>
      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>Missed Tickets:</Text>
      <FlatList
        data={missedTickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        overScrollMode="never"
        scrollEnabled={true}
        persistentScrollbar={true}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
        Rejected Tickets:
      </Text>
      <FlatList
        data={rejectedTickets}
        renderItem={({ item }) => <Card ticket={item} />}
        keyExtractor={(item) => item.id} // Use the unique ID as the key
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
        user: JSON.stringify({
          displayName: ticket.displayName,
          email: ticket.userEmail,
          age: ticket.age,
          avatarUrl: ticket.avatarUrl,
          city: ticket.city,
          contactDetails: ticket.contactDetails,
          sex: ticket.sex,
        }), // Serialize the user data
      },
    });
  };

  const formatDate = (dateString: string) => {
    return moment(dateString, "YYYY-MM-DD").format("MMMM D, YYYY");
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
        {ticket.status === "denied" && (
          <IconBtn icon="user-xmark" size={18} color="red" />
        )}
        {ticket.status === "accepted" && (
          <IconBtn icon="user-check" size={18} color="green" />
        )}
        {ticket.status === "rejected" && (
          <IconBtn icon="user-times" size={18} color="black" />
        )}
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Text style={card.name}>{ticket.ticketNumber}</Text>
          <Text style={card.text}>
            {ticket.selectedDate ? formatDate(ticket.selectedDate) : ""}
          </Text>
          <Text style={card.text}>{ticket.selectedTime || ""}</Text>
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
