import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS, SIZES, SPACES } from "../../../../constants/theme";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import moment from "moment";
import { router } from "expo-router";

interface Ticket {
  selectedHospital: string;
  selectedDate: string;
  selectedTime: string;
  ticketNumber: string;
  status: string;
  userUID: string;
  checklistData: Record<string, any>;
  isComplete: boolean;
  message: string;
  type: string;
  userEmail: string;
}

export default function UpcomingAppointmentsStaff() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewAllModalVisible, setViewAllModalVisible] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "User", currentUser.uid));
        const userData = userDoc.data();
        const hospitalName = userData?.hospitalName;
        if (hospitalName) {
          const q = query(
            collection(db, "ticketDonate"),
            where("selectedHospital", "==", hospitalName),
            where("status", "==", "accepted")
          );
          const querySnapshot = await getDocs(q);
          const fetchedTickets = querySnapshot.docs
            .map((doc) => doc.data() as Ticket)
            .filter((ticket) =>
              moment(ticket.selectedDate).isSameOrAfter(moment(), "day")
            )
            .sort((a, b) =>
              moment(a.selectedDate).diff(moment(b.selectedDate))
            );
          setTickets(fetchedTickets);
        }
      }
      setLoading(false);
    };

    fetchTickets();
  }, [currentUser]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const hasAppointments = tickets.length > 0;

  const handlePress = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTicket(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Upcoming Appointments</Text>
        <Text
          style={{
            color: COLORS.primary,
            fontSize: 14,
            fontFamily: "Poppins_700Bold",
            textDecorationLine: "underline",
          }}
          onPress={() =>
            router.push("/(app)/(admin)/(home)/manage-ticket-all-appointments")
          }
        >
          View all
        </Text>
      </View>
      {hasAppointments ? (
        <FlatList
          data={tickets.slice(0, 5)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              activeOpacity={1}
            >
              <AppointmentCard
                location={item.selectedHospital}
                date={item.selectedDate}
                time={item.selectedTime}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.ticketNumber}
          numColumns={1}
          scrollEnabled={false}
          contentContainerStyle={styles.flatlist}
        />
      ) : (
        <View style={styles.empty}>
          <Image
            source={require("../../../../assets/images/no-appointments.png")}
            style={{
              width: "10%",
              height: 50,
            }}
          />
          <Text style={{ color: COLORS.text }}>No Scheduled Appointments</Text>
        </View>
      )}
      {/* Modal for viewing all appointments */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={viewAllModalVisible}
        onRequestClose={() => setViewAllModalVisible(false)}
      >
        <View style={allAppointments.modalContainer}>
          <View style={[allAppointments.modalContent, { height: "70%" }]}>
            <Text style={allAppointments.modalTitle}>All Appointments</Text>
            <FlatList
              data={tickets}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginBottom: 10, width: 300 }}>
                    <AppointmentCard
                      location={item.selectedHospital}
                      date={item.selectedDate}
                      time={item.selectedTime}
                    />
                  </View>
                );
              }}
              keyExtractor={(item) => item.ticketNumber}
              showsVerticalScrollIndicator={true}
            />
            <TouchableOpacity
              onPress={() => setViewAllModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            {selectedTicket && (
              <>
                <Text style={styles.modalTitle}>Appointment Details</Text>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Hospital:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.selectedHospital}
                  </Text>
                </View>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Date:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.selectedDate}
                  </Text>
                </View>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Time:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.selectedTime}
                  </Text>
                </View>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Ticket Number:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.ticketNumber}
                  </Text>
                </View>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Status:</Text>
                  <Text style={styles.modalValue}>{selectedTicket.status}</Text>
                </View>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

type IAppointmentCard = {
  location: string;
  date: string;
  time: string;
};

export function AppointmentCard({ location, date, time }: IAppointmentCard) {
  const formattedDate = moment(date).format("MMMM DD, YYYY");
  return (
    <View style={card.container}>
      <Image
        source={require("../../../../assets/images/bloodbag.png")}
        style={card.image}
      />
      <View style={card.text}>
        <Text style={card.location} numberOfLines={1}>
          {location || "Medical Institution"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={card.details}>{formattedDate}</Text>
          <Text style={card.details}> • {time}</Text>
        </View>
      </View>
      <View style={card.line} />
    </View>
  );
}
const allAppointments = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  modalDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
    color: COLORS.text,
  },
  modalValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
});
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
    fontFamily: "Poppins_700Bold",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  modalDetails: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    width: "70%",
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
    color: COLORS.text,
  },
  modalValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontFamily: "Poppins_700Bold",
  },
});

const card = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: SPACES.md,
    borderRadius: SIZES.small,
    elevation: 5,
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
    fontFamily: "Poppins_700Bold",
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
