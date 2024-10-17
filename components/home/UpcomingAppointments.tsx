import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import AppointmentCard from "./AppointmentCard";
import { useState } from "react";

export default function UpcomingAppointments() {
  const [hasAppointments, setHasAppointments] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>
      {hasAppointments ? (
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
      ) : (
        <View style={styles.empty}>
          <Image
            source={require("../../assets/images/no-appointments.png")}
            style={{
              width: "20%",
              height: 120,
            }}
          />
          <Text style={{ color: COLORS.text, textAlign: "center" }}>
            You Have No {"\n"} Scheduled Appointments
          </Text>
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
    flex: 1,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
  },
});

const sampleAppointments = [
  {
    id: 1,
    location: "Makati Medical Center",
    date: "Feb 15, 2024",
    time: "5:00pm-5:30pm",
  },
  {
    id: 2,
    location: "Mandaluyong Health Care Center",
    date: "May 15, 2024",
    time: "5:00pm-5:30pm",
  },
];
