import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
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
          data={sampleAppointment}
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
              width: "10%",
              height: 50,
            }}
          />
          <Text style={{ color: COLORS.text }}>No Scheduled Appointments</Text>
        </View>
      )}
    </View>
  );
}

type IAppointmentCard = {
  location: string;
  date: string;
  time: string;
};

export function AppointmentCard({ location, date, time }: IAppointmentCard) {
  return (
    <View style={card.container}>
      <Image
        source={require("../../assets/images/bloodbag.png")}
        style={card.image}
      />
      <View style={card.text}>
        <Text style={card.location} numberOfLines={1}>
          {location || "Medical Institution"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={card.details}>{date}</Text>
          <Text style={card.details}> • {time}</Text>
        </View>
      </View>
      <View style={card.line} />
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
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: SPACES.md,
    borderRadius: SIZES.small,
    elevation: 3,
    shadowColor: "#52006A",
    gap: SPACES.md,
    backgroundColor: COLORS.background,
    position: "relative",
    maxHeight: 70,
    minHeight: 70,
  },
  image: { height: 45, width: 25 },
  text: {
    flex: 1,
    justifyContent: "center",
  },
  location: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  details: {
    fontSize: SIZES.small,
  },
  line: {
    width: 2,
    height: "100%",
    position: "absolute",
    backgroundColor: COLORS.line,
    left: 43.3,
    bottom: 0,
  },
});

const sampleAppointment = [
  {
    id: "0",
    location: "Makati Medical Center",
    date: "Feb 15, 2024",
    time: "5:00pm-5:30pm",
  },
];
