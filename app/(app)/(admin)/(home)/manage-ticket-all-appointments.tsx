import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  RefreshControl,
  Modal,
} from "react-native";
import { COLORS } from "../../../../constants/theme";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsForCurrentUser } from "rtx/slices/tickets";
import { RootState } from "app/store";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface TicketState {
  id: string;
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
  checklistData?: { [key: string]: string }; // Add checklistData as an optional property
  // Add other properties as needed
}

export default function ManageTicketAllAppointments() {
  const router = useRouter();
  const dispatch = useDispatch();
  const tickets = useSelector((state: RootState) => state.tickets.tickets);
  const [ticketList, setTicketList] = useState<TicketState[]>([]); // Define ticketList state
  const [markedDates, setMarkedDates] = useState({});
  const [agendaItems, setAgendaItems] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const [refreshing, setRefreshing] = useState(false); // Refreshing state
  const [emptyDateMessage, setEmptyDateMessage] = useState(""); // New state for empty date message
  const [modalVisible, setModalVisible] = useState(true); // Modal visibility state

  const handleAppointmentPress = async (item) => {
    router.push({
      pathname: "(app)/(admin)/(home)/manage-ticket-review",
      params: {
        ticket: JSON.stringify(item), // Serialize the combined data
      },
    });
  };

  const fetchTickets = async () => {
    setLoading(true);
    setModalVisible(true); // Show modal when fetching starts
    await dispatch(fetchTicketsForCurrentUser());
    setLoading(false);
    setModalVisible(false); // Hide modal when fetching ends
  };

  useEffect(() => {
    fetchTickets();
  }, [dispatch]);

  useEffect(() => {
    const fetchUserDataForTickets = async () => {
      const db = getFirestore();
      const acceptedTickets = tickets.filter(
        (ticket) => ticket.status === "accepted"
      );

      const ticketsWithUserData = await Promise.all(
        acceptedTickets.map(async (ticket) => {
          const userDocRef = doc(db, "User", ticket.userUID);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            return { ...ticket, ...userData };
          } else {
            console.error(
              "User document does not exist for userUID:",
              ticket.userUID
            );
            return ticket; // Return the ticket even if user data is missing
          }
        })
      );

      setTicketList(ticketsWithUserData);
      markAppointmentDates(ticketsWithUserData); // Mark appointments on calendar
      transformAppointmentsToAgendaItems(ticketsWithUserData); // Transform appointments for Agenda
      setModalVisible(false); // Close modal when data is ready
    };

    fetchUserDataForTickets();
  }, [tickets]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTickets();
    setRefreshing(false);
  };

  // Marking appointment dates in the calendar
  const markAppointmentDates = (appointments: TicketState[]) => {
    let dates = {};

    appointments.forEach((appointment) => {
      const formattedDate = moment(
        appointment.selectedDate,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");

      if (!dates[formattedDate]) {
        dates[formattedDate] = {
          marked: true, // This ensures the date is marked with a dot
          dotColor: COLORS.primary, // You can customize the dot color
        };
      }
    });

    console.log("Marked Dates:", dates); // Debugging
    setMarkedDates(dates);
  };

  // Transform appointments to the format required by Agenda
  const transformAppointmentsToAgendaItems = (appointments: TicketState[]) => {
    let items = {};

    appointments.forEach((appointment) => {
      const formattedDate = moment(
        appointment.selectedDate,
        "YYYY-MM-DD"
      ).format("YYYY-MM-DD");

      if (!items[formattedDate]) {
        items[formattedDate] = [];
      }

      items[formattedDate].push({
        id: appointment.id,
        selectedDate: appointment.selectedDate,
        selectedTime: appointment.selectedTime,
        selectedHospital: appointment.selectedHospital,
        status: appointment.status,
        ticketNumber: appointment.ticketNumber,
        userUID: appointment.userUID, // Ensure userUID is included
        displayName: appointment.displayName, // Ensure displayName is included
        userEmail: appointment.userEmail, // Ensure userEmail is included
        age: appointment.age,
        avatarUrl: appointment.avatarUrl,
        city: appointment.city,
        contactDetails: appointment.contactDetails,
        sex: appointment.sex,
      });
    });

    console.log("Agenda Items:", items); // Debugging
    setAgendaItems(items);
  };

  const renderAppointmentItem = (item) => (
    <Pressable
      style={styles.appointmentContainer}
      onPress={() => handleAppointmentPress(item)}
    >
      <Text style={styles.appointmentText}>
        Ticket Number: {item.ticketNumber}
      </Text>
      <Text style={styles.appointmentText}>Name: {item.displayName}</Text>
      <Text style={styles.appointmentText}>Date: {item.selectedDate}</Text>
      <Text style={styles.appointmentText}>Time: {item.selectedTime}</Text>
      <Text style={styles.appointmentText}>
        Hospital: {item.selectedHospital}
      </Text>
      <Text style={styles.appointmentText}>Status: {item.status}</Text>
    </Pressable>
  );

  // Custom renderEmptyDate to show a message or loader when no appointments are available on a specific date
  const renderEmptyDate = () => (
    <View style={styles.emptyDateContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text style={styles.emptyDateText}>
          {emptyDateMessage || "No appointments are planned for this date."}
        </Text>
      )}
    </View>
  );

  // Custom renderEmptyData to handle no appointments at all for the whole period
  const renderEmptyData = () => (
    <View style={styles.emptyDateContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text style={styles.emptyDateText}>
          {emptyDateMessage || "No appointments are available for this period."}
        </Text>
      )}
    </View>
  );

  // Handle what happens when a day is pressed
  const handleDayPress = (day) => {
    setLoading(true); // Start loading when a day is pressed

    setTimeout(() => {
      setLoading(false); // Stop loading after the timeout
      const selectedDate = day.dateString; // Get the clicked date in "YYYY-MM-DD" format

      // Check if the selected date has appointments
      if (
        !agendaItems[selectedDate] ||
        agendaItems[selectedDate].length === 0
      ) {
        // If no appointments, show a message
        setEmptyDateMessage("No appointments are planned for this date.");
      } else {
        // If there are appointments, clear the message
        setEmptyDateMessage("");
      }
    }, 1000); // Simulate loading delay
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.modalText}>Fetching appointment data...</Text>
          </View>
        </View>
      </Modal>
      {!modalVisible && (
        <>
          <Text style={styles.header}>All Appointments</Text>
          <Agenda
            items={agendaItems}
            loadItemsForMonth={(month) => {
              console.log("trigger items loading for month", month);
            }}
            onDayPress={handleDayPress}
            onDayChange={(day) => {
              console.log("day changed", day);
            }}
            selected={moment().format("YYYY-MM-DD")}
            renderItem={renderAppointmentItem}
            renderEmptyDate={renderEmptyDate}
            renderEmptyData={renderEmptyData} // Custom empty data handling
            markedDates={markedDates}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderKnob={() => (
              <FontAwesome name="caret-down" size={30} color={COLORS.primary} />
            )}
            theme={{
              selectedDayBackgroundColor: COLORS.primary,
              todayTextColor: COLORS.primary,
              dotColor: COLORS.primary,
              selectedDotColor: COLORS.primary,
              arrowColor: COLORS.primary,
              textMonthColor: COLORS.primary,
              agendaDayTextColor: COLORS.primary,
              agendaDayNumColor: COLORS.primary,
              agendaTodayColor: COLORS.primary,
              agendaKnobColor: COLORS.primary,
              indicatorColor: COLORS.primary,
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: 10,
  },
  appointmentContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  appointmentText: {
    fontSize: 16,
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  emptyDateText: {
    fontSize: 16,
    color: COLORS.grayDark,
    textAlign: "center", // Center align the text
    paddingHorizontal: 20, // Add padding for better readability
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
});
