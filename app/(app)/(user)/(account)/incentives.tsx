import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  ScrollView,
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
} from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { FontAwesome6, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface Ticket {
  selectedHospital: string;
  selectedDate: string;
  selectedTime: string;
  ticketNumber: string;
  status: string;
  incentives: number;
  userUID: string;
  isComplete: boolean;
}

export default function DonationHistory() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      if (currentUser) {
        const q = query(
          collection(db, "ticketDonate"),
          where("userUID", "==", currentUser.uid),
          where("isComplete", "==", true)
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

  const groupedTickets = tickets.reduce(
    (acc, ticket) => {
      if (ticket.selectedHospital === "UERM Medical Hospital") {
        acc.UERM.push(ticket);
      } else if (ticket.selectedHospital === "ACE Medical Center Mandaluyong") {
        acc.ACE.push(ticket);
      }
      return acc;
    },
    { UERM: [], ACE: [] }
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
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
        <Text style={styles.title}>Incentive History</Text>
      </View>
      {hasAppointments ? (
        <ScrollView>
          <Text style={styles.sectionTitle}>UERM Medical Hospital</Text>
          <FlatList
            data={groupedTickets.UERM}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={styles.cardContainer}
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
            contentContainerStyle={styles.flatlist}
          />
          <Text style={styles.sectionTitle}>
            ACE Medical Center Mandaluyong
          </Text>
          <FlatList
            data={groupedTickets.ACE}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={styles.cardContainer}
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
            contentContainerStyle={styles.flatlist}
          />
        </ScrollView>
      ) : (
        <View style={styles.empty}>
          <FontAwesome6 name="gifts" size={50} color="black" />
          <Text style={styles.emptyText}>You do not have Incentives yet.</Text>
        </View>
      )}
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
                    {moment(selectedTicket.selectedDate).format("MMMM D, YYYY")}
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
                  <Text style={styles.modalValue}>
                    {selectedTicket.status.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalLabel}>Donation Result:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTicket.isComplete ? "COMPLETE" : "Error"}
                  </Text>
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
  return (
    <View style={card.container}>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#FF5733",

          borderRadius: 20,
        }}
      >
        <MaterialIcons
          name="star"
          size={30}
          color="#FF5733"
          style={{ margin: 5 }}
        />
      </View>
      <View style={card.text}>
        <Text style={card.location} numberOfLines={1}>
          {location || "Medical Institution"}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={card.details}>{date}</Text>
          <Text style={card.details}> • {time}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.grayDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACES.xs,
    backgroundColor: COLORS.background,
    padding: SPACES.md,
  },
  bar: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACES.md,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },
  flatlist: {
    flex: 1,
    gap: SPACES.sm,
    padding: 2,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: SPACES.md,
  },
  emptyText: {
    color: COLORS.text,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: SPACES.md,
    fontSize: SIZES.medium,
    color: COLORS.text,
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
    borderRadius: 10,
    alignItems: "center",
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
    width: "100%",
    marginBottom: 10,
    fontFamily: "Poppins_400Regular",
  },
  modalLabel: {
    fontSize: SIZES.medium,
    fontFamily: "Poppins_700Bold",
    color: COLORS.text,
  },
  modalValue: {
    fontSize: SIZES.medium,
    color: COLORS.text,
    fontFamily: "Poppins_400Regular",
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
  cardContainer: {
    margin: 5,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
    marginVertical: SPACES.md,
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
    alignItems: "center",
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
    color: COLORS.grayDark,
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
