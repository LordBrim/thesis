import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";
import EventCard from "../../../components/home/EventCard";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";

export default function AllEventsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allEventsData}
        renderItem={({ item }) => (
          <EventCard
            image={item.image}
            title={item.title}
            date={item.date}
            time={item.time}
          />
        )}
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
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatlist: {
    gap: SPACES.md,
    paddingBottom: HORIZONTAL_SCREEN_MARGIN,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

const allEventsData = [
  {
    id: "1",
    image: require("../../../assets/images/location1.jpg"),
    title: "Medical Center Parañaque",
    time: "8:00am-5:00pm",
    date: "Apr 25, 2024",
  },
  {
    id: "2",
    image: require("../../../assets/images/location3.jpg"),
    title: "Madugong Mandaluyong: Halloween Blood Donation",
    time: "10:00am-8:00pm",
    date: "Oct 31, 2024",
  },
  {
    id: "3",
    image: require("../../../assets/images/location2.jpg"),
    title: "Panahon Ng Pasko: Blood Donation Para Sa Nangangailangan",
    time: "12:00am-4:00pm",
    date: "Nov 29, 2024 - Dec 20, 2024",
  },
  {
    id: "4",
    image: require("../../../assets/images/location1.jpg"),
    title: "Medical Center Parañaque",
    time: "8:00am-5:00pm",
    date: "Apr 25, 2024",
  },
  {
    id: "5",
    image: require("../../../assets/images/location3.jpg"),
    title: "Madugong Mandaluyong: Halloween Blood Donation",
    time: "10:00am-8:00pm",
    date: "Oct 31, 2024",
  },
  {
    id: "6",
    image: require("../../../assets/images/location2.jpg"),
    title: "Panahon Ng Pasko: Blood Donation Para Sa Nangangailangan",
    time: "12:00am-4:00pm",
    date: "Nov 29, 2024 - Dec 20, 2024",
  },
];
