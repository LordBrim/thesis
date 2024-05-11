import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import AppointmentCard from "./AppointmentCard";

export default function UpcomingAppointments() {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>
      {sampleAppointments ? (
        <SafeAreaView>
          <FlatList
            data={sampleAppointments}
            renderItem={({ item }) => (
              <AppointmentCard
                location={item.location}
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
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  flatlist: {
    flex: 1,
    gap: SPACES.sm,
    padding: 2,
  },
  empty: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
});

const sampleAppointments = [
  {
    id: 1,
    location: "Location 1",
    date: "Feb 15, 2024",
    time: "5:00pm-5:30pm",
  },
  {
    id: 2,
    location: "Location 2",
    date: "May 15, 2024",
    time: "5:00pm-5:30pm",
  },
];
