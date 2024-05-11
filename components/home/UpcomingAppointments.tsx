import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import RecentDonationCard from "./RecentDonationCard";

export default function UpcomingAppointments() {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>
      {sampleData ? (
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
      ) : (
        <View style={styles.empty}>
          <Text style={{ color: COLORS.gray }}>No Scheduled Appointments</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.xs,
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
    gap: SPACES.sm,
  },
  empty: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
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
