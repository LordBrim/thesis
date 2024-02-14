import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  FlatList,
  SafeAreaView,
} from "react-native";
import { SIZES } from "../../constants/theme";
import RecentDonationCard from "./RecentDonationCard";

export default function RecentDonations({ toDonationHistory }) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Recent Donations</Text>
        <TouchableHighlight onPress={toDonationHistory}>
          <Text>View All</Text>
        </TouchableHighlight>
      </View>
      <SafeAreaView>
        <FlatList
          data={sampleData}
          renderItem={({ item }) => (
            <RecentDonationCard location={item.location} date={item.date} />
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
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  flatlist: {
    flex: 1,
    gap: SIZES.medium,
    padding: 2,
  },
});

const sampleData = [
  {
    id: 1,
    location: "Location 1",
    date: "February 15, 2024",
  },
  {
    id: 2,
    location: "Location 2",
    date: "February 16, 2024",
  },
  {
    id: 3,
    location: "Location 3",
    date: "February 17, 2024",
  },
];
