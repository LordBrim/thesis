import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";
import { SIZES, SPACES } from "../../constants/theme";
import EventCard from "./EventCard";

export default function UpcomingEvents({ toEvent }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Blood Donation Events</Text>
      <SafeAreaView>
        <FlatList
          data={sampleData}
          renderItem={({ item }) => (
            <EventCard
              toEvent={toEvent}
              image={item.image}
              title={item.title}
              date={item.date}
              time={item.time}
            />
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          scrollEnabled={false}
          contentContainerStyle={styles.flatlist}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.sm,
  },
  flatlist: {
    flex: 1,
    gap: SPACES.md,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

const sampleData = [
  {
    id: 1,
    image: require("../../assets/images/location1.jpg"),
    title: "Medical Center Parañaque",
    time: "8:00am-5:00pm",
    date: "April 25, 2024",
  },
  {
    id: 2,
    image: require("../../assets/images/location3.jpg"),
    title: "Madugong Mandaluyong: Halloween Blood Donation",
    time: "10:00am-8:00pm",
    date: "Oct 31, 2024",
  },
  {
    id: 3,
    image: require("../../assets/images/location2.jpg"),
    title: "Panahon Ng Pasko: Blood Donation Para Sa Nangangailangan",
    time: "12:00am-4:00pm",
    date: "Nov 29, 2024 - Dec 20, 2024",
  },
];
