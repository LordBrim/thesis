import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import EventCard from "./EventCard";
import LinkBtn from "components/common/LinkBtn";
import { FIRESTORE_DB, FIREBASE_STORAGE } from "firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment"; // Import moment for date formatting
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIRESTORE_DB, "events"));
        const allEvents = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const eventData = doc.data();
            let imageUrl;
            try {
              imageUrl = await getDownloadURL(
                ref(FIREBASE_STORAGE, `events/${doc.id}`)
              );
            } catch (error) {
              console.error(
                `Error fetching image for event ${doc.id}: `,
                error
              );
              imageUrl = "https://via.placeholder.com/150"; // Default image URL
            }
            return {
              id: doc.id,
              ...eventData,
              imageUrl,
              latitude: eventData.latitude, // Fetch latitude
              longitude: eventData.longitude, // Fetch longitude
            };
          })
        );

        // Filter and sort events by start date
        const now = moment();
        const upcomingEvents = allEvents.filter(event => {
          const eventEnd = moment(`${event.endDate} ${event.endTime}`, "MM/DD/YYYY hh:mm A");
          return eventEnd.isAfter(now);
        }).sort((a, b) => {
          const dateA = moment(a.startDate, "MM/DD/YYYY");
          const dateB = moment(b.startDate, "MM/DD/YYYY");
          return dateA - dateB;
        });

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isActiveEvent = (startDate, startTime, endDate, endTime) => {
    const now = moment();
    const start = moment(`${startDate} ${startTime}`, "MM/DD/YYYY hh:mm A");
    const end = moment(`${endDate} ${endTime}`, "MM/DD/YYYY hh:mm A");
    return now.isBetween(start, end);
  };

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
      {isActiveEvent(item.startDate, item.startTime, item.endDate, item.endTime) && (
        <View style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
          <Text style={{ backgroundColor: COLORS.primary, 
            color: 'white', padding: 10, borderBottomRightRadius: 10, fontSize: 15 }}>
            Active Event
          </Text>
        </View>
      )}
      <EventCard
        documentId={item.id}
        description={item.description}
        address={item.address}
        image={{ uri: item.imageUrl }}
        title={item.title}
        date={`${moment(item.startDate, "MM/DD/YYYY").format("MMMM D, YYYY")} ${
          item.startTime
        }`}
        time={`${moment(item.endDate, "MM/DD/YYYY").format("MMMM D, YYYY")} ${
          item.endTime
        }`}
        manageEvents={true} // Pass the manageEvents prop as true
        latitude={item.latitude} // Pass latitude to EventCard
        longitude={item.longitude} // Pass longitude to EventCard
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Events</Text>
        <LinkBtn
          label="View All"
          onPress={() =>
            navigation.navigate("(app)/(user)/(home)/all-events", { events })
          } // Pass events as parameter
          linkStyle={{ color: COLORS.gray, textDecorationLine: "none" }}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          {events.length > 0 ? (
            <FlatList
              data={events}
              renderItem={renderEventItem} // Use the renderEventItem function
              keyExtractor={(item) => item.id}
              numColumns={1}
              scrollEnabled={false}
              contentContainerStyle={styles.flatlist}
            />
          ) : (
            <View style={styles.noEventsContainer}>
              <MaterialCommunityIcons name="calendar-alert" size={55} color={COLORS.grayMid} />
              <Text style={styles.noEventsText}>No upcoming events at the moment.</Text>
              </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.md,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatlist: {
    gap: SPACES.md,
  },
  eventContainer: {
    marginVertical: 5,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
    borderWidth:1,
    borderColor: COLORS.grayMid,
    borderRadius: 30
  },
  noEventsText: {
    marginTop: 10,
    fontSize: SIZES.large,
    color: COLORS.grayMid
  },
});