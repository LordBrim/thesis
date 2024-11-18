import { useNavigation } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  RefreshControl,
  ActivityIndicator,
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
  deleteDoc,
} from "firebase/firestore";
import moment from "moment";
import Divider from "constants/divider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { onAuthStateChanged } from "firebase/auth";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";
import { useFocusEffect } from "@react-navigation/native";
import SingleBtnModal from "components/common/modals/SingleBtnModal";
import CallToActionBtn from "components/common/CallToActionBtn";
const Tab = createMaterialTopTabNavigator();

interface TicketState {
  id: string;
  name: string;
  status: "pending" | "rejected" | "accepted" | "cancelled";
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
  checklistData?: { [key: string]: string };
  isComplete?: boolean;
  // Add checklistData as an optional property
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
  status?: "pending" | "rejected" | "accepted" | "cancelled" | "cancelled";
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
        fontFamily: "Poppins_400Regular",
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
      <Tab.Screen name="Active" component={ManageTicketDonationsActive} />
      <Tab.Screen name="Closed" component={ManageTicketsDonationsArchived} />
    </Tab.Navigator>
  );
}

function ManageTicketsDonationsPending() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchTickets();
    }, [hospitalName])
  );

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
            textStyle={{
              color: "#fff",
              fontSize: 16,
              fontFamily: "Poppins_700Bold",
            }}
          />
          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24 }}>
            Pending Appointments:
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, fontStyle: "italic", marginVertical: 5 }}>
        Click tickets to view more details.
      </Text>
      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      {error && (
        <View style={styles.centeredContainer}>
          <Text>{error}</Text>
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : tickets.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyMessage}>No pending tickets available.</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
}
function ManageTicketsDonationsArchived() {
  const [tickets, setTickets] = useState<TicketState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hospitalName, setHospitalName] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

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
    if (!hospitalName) return;
    console.log("Fetching tickets for hospital:", hospitalName);

    try {
      const q = query(
        collection(FIRESTORE_DB, "ticketDonate"),
        where("type", "==", "appointment"),
        where("selectedHospital", "==", hospitalName)
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
              } as TicketState;

              return ticket;
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

  useFocusEffect(
    React.useCallback(() => {
      fetchTickets();
    }, [hospitalName])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchTickets();
    } catch (error) {
      console.error("Error refreshing tickets:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    if (filterStatus === "all") {
      return (
        (ticket.status === "accepted" && ticket.isComplete) ||
        ticket.status === "rejected" ||
        ticket.status === "cancelled"
      );
    }
    if (filterStatus === "completed") {
      return ticket.status === "accepted" && ticket.isComplete;
    }
    return ticket.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const sortedTickets = filteredTickets.sort((a, b) => {
    const dateA = moment(
      `${a.selectedDate} ${a.selectedTime}`,
      "YYYY-MM-DD h:mm A"
    );
    const dateB = moment(
      `${b.selectedDate} ${b.selectedTime}`,
      "YYYY-MM-DD h:mm A"
    );
    return dateB.valueOf() - dateA.valueOf(); // Sort in descending order
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 24 }}>
          Archived Appointments:
        </Text>
      </View>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={filterStatus}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setFilterStatus(itemValue);
            console.log("Filter status updated to:", itemValue);
          }}
        >
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Completed" value="completed" />
          <Picker.Item label="Rejected" value="rejected" />
          <Picker.Item label="Cancelled" value="cancelled" />
        </Picker>
      </View>

      <Divider height={0.5} width={350} color={COLORS.grayMid} margin={5} />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : sortedTickets.length === 0 ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.emptyMessage}>
            No archived tickets available.
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedTickets}
          renderItem={({ item }) => <Card ticket={item} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          overScrollMode="never"
          scrollEnabled={true}
          persistentScrollbar={true}
        />
      )}
    </View>
  );
}

export function Card({ ticket }: CardProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

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

  const handleDelete = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(FIRESTORE_DB, "ticketDonate", ticket.id));
      setModalVisible(false);
      setSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error("Error deleting ticket: ", error);
      setErrorModalVisible(true); // Show error modal
    }
  };

  const formatDate = (dateString: string) => {
    return moment(dateString, "YYYY-MM-DD").format("MMMM D, YYYY");
  };

  return (
    <>
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
            <IconBtn icon="user" size={18} color="blue" />
          )}
          {ticket.status === "rejected" && (
            <IconBtn icon="user-xmark" size={18} color="red" />
          )}
          {ticket.status === "accepted" && ticket.isComplete === false && (
            <IconBtn icon="user" size={18} color="green" />
          )}
          {ticket.status === "accepted" && ticket.isComplete === true && (
            <IconBtn icon="user-check" size={18} color="green" />
          )}
          {ticket.status === "cancelled" && (
            <IconBtn icon="user-clock" size={18} color={COLORS.grayDark} />
          )}
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={card.name}>{ticket.ticketNumber}</Text>
            <Text style={card.text}>
              {ticket.selectedDate ? formatDate(ticket.selectedDate) : ""}
            </Text>
            <Text style={card.text}>{ticket.selectedTime || ""}</Text>
          </View>
        </View>
        <IconBtn
          icon="trash"
          size={18}
          onPress={handleDelete}
          color={COLORS.primary}
        />
        <IconBtn icon="angle-right" size={18} onPress={handlePress} />
      </Pressable>

      <SingleBtnModal
        visible={modalVisible}
        title="Delete Ticket"
        description="Are you sure you want to delete this ticket? This action cannot be undone."
        onRequestClose={confirmDelete}
        onPress={confirmDelete}
        btnLabel="Delete"
        animation={true}
        extraBtn={
          <CallToActionBtn
            label={"I Disagree"}
            onPress={() => setModalVisible(false)}
            secondary
          />
        }
      />

      <SingleBtnModal
        visible={successModalVisible}
        title="Success"
        description="Ticket deleted successfully."
        onRequestClose={() => setSuccessModalVisible(false)}
        onPress={() => setSuccessModalVisible(false)}
        btnLabel="OK"
        animation={true}
      />

      <SingleBtnModal
        visible={errorModalVisible}
        title="Error"
        description="Failed to delete ticket. Please try again."
        onRequestClose={() => setErrorModalVisible(false)}
        onPress={() => setErrorModalVisible(false)}
        btnLabel="OK"
        animation={true}
      />
    </>
  );
}
const ManageTicketDonationsActive = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;
  const currentUser = auth.currentUser;

  const fetchTickets = async () => {
    if (currentUser) {
      // Get the current user's hospitalName
      const userDocRef = doc(db, "User", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const hospitalName = userData.hospitalName;

        // Query the ticketDonate collection
        const q = query(
          collection(db, "ticketDonate"),
          where("selectedHospital", "==", hospitalName),
          where("status", "==", "accepted"),
          where("isComplete", "==", false)
        );
        const querySnapshot = await getDocs(q);
        const fetchedTickets = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        });

        // Sort tickets by closest to the current date in descending order
        const sortedTickets = fetchedTickets.sort((a, b) => {
          const dateA = moment(
            `${a.selectedDate} ${a.selectedTime}`,
            "YYYY-MM-DD h:mm A"
          );
          const dateB = moment(
            `${b.selectedDate} ${b.selectedTime}`,
            "YYYY-MM-DD h:mm A"
          );
          return dateB.valueOf() - dateA.valueOf(); // Sort in descending order
        });

        setTickets(sortedTickets);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, [currentUser]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTickets();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={ACTIVE.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={ACTIVE.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={ACTIVE.container}>
      <Text style={ACTIVE.title}>Active Tickets</Text>
      {tickets.length === 0 ? (
        <View style={ACTIVE.loadingContainer}>
          <Text style={ACTIVE.emptyMessage}>No active tickets available.</Text>
        </View>
      ) : (
        <FlatList
          data={tickets}
          renderItem={({ item }) => <Card ticket={item} />}
          key={tickets.id}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const ACTIVE = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  flatlist: {
    flex: 1,
    gap: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: COLORS.text,
  },
  emptyMessage: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
    marginTop: 20,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  emptyMessage: {
    fontSize: 18,
    color: COLORS.text,
    textAlign: "center",
    marginTop: 20,
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
  },
  name: {
    minWidth: "78%",
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },
  text: {
    fontSize: 14,
  },
});
