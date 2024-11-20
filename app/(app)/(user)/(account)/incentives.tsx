import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Fontisto, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "constants";
import { ColorPicker } from "react-native-btr";

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

interface Hospital {
  name: string;
  address: string;
  contact: string;
  logoUrl?: string;
  incentives?: { number: number };
}

interface Incentive {
  incentive: string;
  position: number;
  info?: string;
}

const incentivesData: Incentive[] = [
  { incentive: "T-Shirt", position: 1 },
  {
    incentive: "Priority",
    position: 3,
    info: "Yes, you only need four (4) donation.",
  },
];

export default function DonationHistory() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [hospitalData, setHospitalData] = useState<{ [key: string]: Hospital }>(
    {
      UERM: { name: "", address: "", contact: "" },
      ACE: { name: "", address: "", contact: "" },
    }
  );

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const auth = getAuth();
  const db = getFirestore();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchTickets(), fetchHospitalData()]);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const fetchTickets = async () => {
    if (!currentUser) return;

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
  };

  const fetchHospitalData = async () => {
    const q = query(
      collection(db, "hospital"),
      where("name", "in", [
        "UERM Medical Hospital",
        "ACE Medical Center Mandaluyong",
      ])
    );
    const querySnapshot = await getDocs(q);
    const hospitals = querySnapshot.docs.reduce(
      (acc, doc) => {
        const data = doc.data() as Hospital;
        if (data.name === "UERM Medical Hospital") {
          acc.UERM = data;
        } else if (data.name === "ACE Medical Center Mandaluyong") {
          acc.ACE = data;
        }
        return acc;
      },
      {
        UERM: { name: "", address: "", contact: "" },
        ACE: { name: "", address: "", contact: "" },
      }
    );
    setHospitalData(hospitals);
  };

  const groupedTickets = tickets.reduce(
    (acc, ticket) => {
      if (ticket.selectedHospital === "UERM Medical Hospital") {
        acc.UERM.push(ticket);
      } else if (ticket.selectedHospital === "ACE Medical Center Mandaluyong") {
        acc.ACE.push(ticket);
      }
      return acc;
    },
    { UERM: [] as Ticket[], ACE: [] as Ticket[] }
  );

  const renderHospitalCard = ({ item }: { item: { key: string } }) => {
    const hospital = item.key === "UERM" ? hospitalData.UERM : hospitalData.ACE;
    const incentiveNumber = hospital.incentives?.number || 0;
    const donationsCount = groupedTickets[item.key]?.length || 0;
    const incentiveInfo = hospital.incentives?.info;

    return (
      <Animated.View style={[styles.hospitalCard, { opacity: fadeAnim }]}>
        <LinearGradient
          colors={[COLORS.primary, "#FF8C69"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.hospitalHeader}>
            {hospital.logoUrl ? (
              <Image
                source={{ uri: hospital.logoUrl }}
                style={styles.hospitalLogo}
              />
            ) : (
              <MaterialIcons name="local-hospital" size={40} color="white" />
            )}
            <View style={styles.hospitalInfo}>
              <Text style={styles.hospitalName}>{hospital.name}</Text>
              <Text style={styles.hospitalAddress}>
                {incentiveInfo || hospital.address}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Donation Progress</Text>
            <Text style={styles.progressCount}>
              {donationsCount}/{incentiveNumber} Donations
            </Text>
          </View>

          <FlatList
            data={Array(incentiveNumber).fill(null)}
            renderItem={({ _, index }) => {
              const incentive = incentivesData.find(
                (inc) => inc.position === index + 1
              );
              return (
                <View style={styles.donationIcon}>
                  <Text style={styles.donationNumber}>{index + 1}</Text>
                  <Fontisto
                    name="blood"
                    size={35}
                    color={index < donationsCount ? "#FF5733" : "#E0E0E0"}
                  />
                  {incentive && (
                    <Text style={styles.incentiveText}>
                      {incentive.incentive}
                    </Text>
                  )}
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.donationGrid}
          />
        </View>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5733" />
        <Text style={styles.loadingText}>Loading your Incentives...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track your blood donation journey</Text>
      </View>

      {tickets.length > 0 ? (
        <FlatList
          data={[{ key: "UERM" }, { key: "ACE" }]}
          renderItem={renderHospitalCard}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome6 name="hand-holding-heart" size={60} color="#FF5733" />
          <Text style={styles.emptyTitle}>No Donations Yet</Text>
          <Text style={styles.emptyText}>
            Start your journey of saving lives through blood donation today.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666666",
  },
  content: {
    padding: 16,
    gap: 16,
  },
  hospitalCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: "hidden",
  },
  headerGradient: {
    padding: 16,
  },
  hospitalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  hospitalLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
  },
  hospitalInfo: {
    marginLeft: 16,
    flex: 1,
  },
  hospitalName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "white",
  },
  hospitalAddress: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255, 255, 255, 0.8)",
  },
  progressContainer: {
    padding: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#333333",
  },
  progressCount: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "#666666",
  },
  donationGrid: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  donationIcon: {
    alignItems: "center",
    width: 70,
    gap: 4,
  },
  donationNumber: {
    fontFamily: "Poppins_400Regular",
    color: "#666666",
  },
  incentiveText: {
    fontFamily: "Poppins_400Regular",
    color: "#666666",
    fontSize: 12,
    textAlign: "center",
  },
  incentiveInfo: {
    fontFamily: "Poppins_400Regular",
    color: "#666666",
    fontSize: 10,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#333333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#666666",
    textAlign: "center",
    lineHeight: 24,
  },
});
