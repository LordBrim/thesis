import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { SIZES, SPACES } from "../../constants/theme";
import RecentDonationCard from "./RecentDonationCard";

export default function RecentDonations({}) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Recent Donations</Text>
      </View>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => (
          <RecentDonationCard location={item.location} date={item.date} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        scrollEnabled={false}
        contentContainerStyle={styles.flatlist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: SPACES.xs,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
  },
  flatlist: {
    flex: 1,
    gap: SPACES.sm,
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
  {
    id: 4,
    location: "Location 4",
    date: "February 15, 2024",
  },
  {
    id: 5,
    location: "",
    date: "",
  },
];
