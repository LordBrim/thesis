import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Modal } from "react-native";
import { COLORS } from "../../../../constants/theme";
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from "firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { router } from "expo-router";
import EventCard from "components/home/EventCard";
import CustomButtonWithIcon from "components/common/CustomButtonWithIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ManageEvents({ navigation }) {
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [agendaItems, setAgendaItems] = useState({});
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [emptyDateMessage, setEmptyDateMessage] = useState(""); // New state for empty date message

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setCurrentUser(user);
        const q = query(
          collection(FIRESTORE_DB, "events"),
          where("userUID", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const userEvents = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const eventData = doc.data();
            const imageUrl = await getDownloadURL(
              ref(FIREBASE_STORAGE, `events/${doc.id}`)
            );
            return { id: doc.id, ...eventData, imageUrl };
          })
        );
        setEvents(userEvents);
        markEventDates(userEvents); // Mark events on calendar
        transformEventsToAgendaItems(userEvents); // Transform events for Agenda
      } else {
        setCurrentUser(null);
        setEvents([]);
        setMarkedDates({});
        setAgendaItems({});
      }
      setLoading(false); // Set loading to false after data fetching is done
    });

    return () => unsubscribe();
  }, []);

  // Helper function to convert "MM/DD/YYYY" or "YYYY-MM-DD" to "YYYY-MM-DD"
  const convertDateString = (dateString) => {
    if (dateString.includes("/")) {
      const [month, day, year] = dateString.split("/");
      if (!month || !day || !year) {
        console.error("Invalid date format:", dateString);
        return null;
      }
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } else if (dateString.includes("-")) {
      const [year, month, day] = dateString.split("-");
      if (!year || !month || !day) {
        console.error("Invalid date format:", dateString);
        return null;
      }
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } else {
      console.error("Invalid date format:", dateString);
      return null;
    }
  };

  // Marking event dates in the calendar
  const markEventDates = (events) => {
    let dates = {};

    events.forEach((event) => {
      const startDate = moment(event.startDate, "MM/DD/YYYY");
      const endDate = moment(event.endDate, "MM/DD/YYYY");
      const current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        const formattedDate = current.format("YYYY-MM-DD");

        if (!dates[formattedDate]) {
          dates[formattedDate] = {
            marked: true, // This ensures the date is marked with a dot
            dotColor: COLORS.primary, // You can customize the dot color
          };
        }

        current.add(1, "day");
      }
    });

    setMarkedDates(dates);
  };

  // Transform events to the format required by Agenda
  const transformEventsToAgendaItems = (events) => {
    let items = {};

    events.forEach((event) => {
      const startDate = moment(event.startDate, "MM/DD/YYYY");
      const endDate = moment(event.endDate, "MM/DD/YYYY");

      const current = startDate.clone();

      while (current.isSameOrBefore(endDate)) {
        const formattedDate = current.format("YYYY-MM-DD");

        if (!items[formattedDate]) {
          items[formattedDate] = [];
        }

        items[formattedDate].push({
          id: event.id,
          name: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          startTime: event.startTime,
          endTime: event.endTime,
          imageUrl: event.imageUrl,
          description: event.description,
        });

        current.add(1, "day");
      }
    });

    setAgendaItems(items);
  };

  const renderEventItem = (item) => (
    <View style={styles.eventContainer}>
      <EventCard
        description={item.description}
        address={item.address}
        image={{ uri: item.imageUrl }}
        title={item.name}
        date={`${moment(item.startDate, "MM/DD/YYYY").format("MMMM D, YYYY")} ${
          item.startTime
        }`}
        time={`${moment(item.endDate, "MM/DD/YYYY").format("MMMM D, YYYY")} ${
          item.endTime
        }`}
        documentId={item.id}
        manageEvent={true}
        isAdmin={true}
      />
    </View>
  );

  // Custom renderEmptyDate to show a message or loader when no events are available on a specific date
  const renderEmptyDate = () => (
    <View style={styles.emptyDateContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text style={styles.emptyDateText}>
          {emptyDateMessage || "No events are planned for this date."}
        </Text>
      )}
    </View>
  );

  // Custom renderEmptyData to handle no events at all for the whole period
  const renderEmptyData = () => (
    <View style={styles.emptyDateContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text style={styles.emptyDateText}>
          {emptyDateMessage || "No events are available for this period."}
        </Text>
      )}
    </View>
  );

  // Handle what happens when a day is pressed
  const handleDayPress = (day) => {
    const selectedDate = day.dateString; // Get the clicked date in "YYYY-MM-DD" format

    // Check if the selected date has events
    if (!agendaItems[selectedDate] || agendaItems[selectedDate].length === 0) {
      // If no events, show a message
      setEmptyDateMessage("No events are planned for this date.");
    } else {
      // If there are events, clear the message
      setEmptyDateMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.modalText}>Fetching all active events...</Text>
          </View>
        </View>
      </Modal>
      {!loading && (
        <>
          <Text style={styles.header}>Your Events</Text>
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
            renderItem={renderEventItem}
            renderEmptyDate={renderEmptyDate}
            renderEmptyData={renderEmptyData} // Custom empty data handling
            markedDates={markedDates}
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
          <CustomButtonWithIcon
            title="Create Event"
            icon="calendar-plus-o"
            iconSize={24}
            iconColor={"white"}
            textStyle={{ color: "white" }}
            buttonStyle={{
              backgroundColor: COLORS.primary,
              marginVertical: 0,
              marginTop: 10,
            }}
            onPress={() =>
              router.navigate("/(app)/(home)/manage-create-events")
            }
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
  eventContainer: {
    marginVertical: 5,
  },
  headerContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
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
