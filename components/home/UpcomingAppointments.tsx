import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

interface Ticket {
  selectedHospital: string;
  selectedDate: string;
  selectedTime: string;
  ticketNumber: string;
  status: string;
  userUID: string;
}

export default function UpcomingAppointments() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchTickets = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "ticketDonate"),
          where("userUID", "==", currentUser.uid),
          where("status", "==", "accepted")
        );
        const querySnapshot = await getDocs(q);
        const fetchedTickets = querySnapshot.docs.map(
          (doc) => doc.data() as Ticket
        );
        setTickets(fetchedTickets);
      }
      setLoading(false);
    };

    fetchTickets();
  }, [currentUser]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const hasAppointments = tickets.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Appointments</Text>
      </View>
      {hasAppointments ? (
        <FlatList
          data={tickets}
          renderItem={({ item }) => (
            <AppointmentCard
              location={item.selectedHospital}
              date={item.selectedDate}
              time={item.selectedTime}
            />
          )}
          keyExtractor={(item) => item.ticketNumber}
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
    fontSize: SIZES.medium,
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
    backgroundColor: COLORS.grayDark,
    left: 43.3,
    bottom: 0,
  },
});
