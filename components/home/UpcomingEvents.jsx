import { StyleSheet, SafeAreaView, View, Text, FlatList } from "react-native";
import { SIZES } from "../../constants/theme";
import EventCard from "./EventCard";

export default function UpcomingEvents({ toEvent }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Blood Donation Events</Text>
      <SafeAreaView>
        <FlatList
          data={sampleData}
          renderItem={({ item }) => (
            <EventCard toEvent={toEvent} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          scrollEnabled={false}
          contentContainerStyle={styles.container}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SIZES.medium,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});

const sampleData = [
  { id: 1, title: "Event Card 1" },
  { id: 2, title: "Event Card 2" },
  { id: 3, title: "Event Card 3" },
  { id: 4, title: "Event Card 4" },
  { id: 5, title: "Event Card 5" },
];
