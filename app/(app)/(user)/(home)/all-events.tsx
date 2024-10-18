import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import EventCard from "../../../../components/home/EventCard";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../../constants";
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from "firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import moment from "moment"; // Import moment for date formatting

export default function AllEventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
            return { id: doc.id, ...eventData, imageUrl };
          })
        );
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const renderEventItem = ({ item }) => (
    <View style={styles.eventContainer}>
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
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEventItem} // Use the renderEventItem function
        keyExtractor={(item) => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.sm,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatlist: {
    gap: SPACES.md,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
  },
  eventContainer: {
    marginVertical: 5,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
