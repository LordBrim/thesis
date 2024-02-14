import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
} from "react-native";
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
            <EventCard
              toEvent={toEvent}
              title={item.title}
              image={item.image}
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
    gap: SIZES.medium,
  },
  flatlist: {
    flex: 1,
    gap: SIZES.medium,
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
    title: "Event Card 1",
  },
  {
    id: 2,
    image: require("../../assets/images/location2.jpg"),
    title: "Event Card 2",
  },
  {
    id: 3,
    image: require("../../assets/images/location3.jpg"),
    title: "Event Card 3",
  },
];
