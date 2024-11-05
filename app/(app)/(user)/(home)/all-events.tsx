import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../../rtx/slices/events";
import type { AppDispatch } from "app/store"; // Import the correct type for dispatch
import { RootState } from "app/store";
import EventCard from "../../../../components/home/EventCard";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../../constants";
import moment from "moment"; // Import moment for date formatting

interface Event {
  id: string;
  title: string;
  description: string;
  address: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  imageUrl: string;
  latitude: string; // Ensure latitude is included
  longitude: string; // Ensure longitude is included
}

export default function AllEventsScreen() {
  const dispatch: AppDispatch = useDispatch(); // Use the correct type for dispatch
  const {
    events = [],
    pastEvents = [],
    loading,
    error,
  } = useSelector((state: RootState) => state.events);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const sortedPastEvents = [...pastEvents].sort((a, b) => {
    const dateA = moment(a.endDate, "MM/DD/YYYY");
    const dateB = moment(b.endDate, "MM/DD/YYYY");
    return dateB.diff(dateA);
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

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

  const renderPastEventItem = ({ item }: { item: Event }) => (
    <View style={styles.eventPastContainer}>
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>View Past Events</Text>
      </TouchableOpacity>
      <FlatList
        data={events} // Ensure events is an array
        renderItem={renderEventItem} // Use the renderEventItem function
        keyExtractor={(item) => item.id}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        overScrollMode="never"
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Past Events</Text>
          <FlatList
            data={sortedPastEvents} // Ensure sortedPastEvents is an array
            renderItem={renderPastEventItem} // Use the renderPastEventItem function
            keyExtractor={(item) => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatlist}
            overScrollMode="never"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.sm,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    backgroundColor: COLORS.background,
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
  eventPastContainer: {
    width: "80%",
    marginVertical: 5,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.medium,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
