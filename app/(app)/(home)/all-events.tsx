import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import EventCard from "../../../components/home/EventCard";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";
import moment from "moment"; // Import moment for date formatting

// Define the type for your route parameters
type AllEventsScreenRouteProp = RouteProp<
  { params: { events: Event[] } },
  "params"
>;

// Define the type for your Event
interface Event {
  id: string;
  description: string;
  address: string;
  imageUrl: string;
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  latitude: number;
  longitude: number;
}

export default function AllEventsScreen() {
  // Use the useRoute hook to get the route parameters
  const route = useRoute<AllEventsScreenRouteProp>();
  // Destructure the events from the route parameters
  const { events: passedEvents } = route.params || { events: [] };
  // Initialize the state with the passed events
  const [events, setEvents] = useState<Event[]>(passedEvents);
  // Set the loading state based on whether events are passed
  const [loading, setLoading] = useState(!passedEvents.length);

  // If loading, show a loading indicator
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Function to render each event item
  const renderEventItem = ({ item }: { item: Event }) => (
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
        latitude={item.latitude}
        longitude={item.longitude}
      />
    </View>
  );

  // Render the FlatList with the events
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
