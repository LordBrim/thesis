import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import EventCard from "./EventCard";
import { SIZES } from "../../constants/theme";

const sampleData = [
  { id: 1, title: "Event Card 1" },
  { id: 2, title: "Event Card 2" },
  { id: 3, title: "Event Card 3" },
  { id: 4, title: "Event Card 4" },
  { id: 5, title: "Event Card 5" },
];

export default function EventCardsList() {
  return (
    <SafeAreaView>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => <EventCard title={item.title} />}
        keyExtractor={(item) => item.id}
        numColumns={1}
        scrollEnabled={false}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SIZES.medium,
    marginTop: SIZES.large,
  },
});
