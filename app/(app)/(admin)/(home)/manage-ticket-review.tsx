import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "constants/theme";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import IconBtn from "components/common/IconButton";
import { doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "firebase-config";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
interface TicketState {
  id: string;
  name: string;
  status: "pending" | "rejected" | "accepted" | "denied";
  userUID: string;
  userEmail: string;
  age?: number;
  avatarUrl?: string;
  city?: string;
  contactDetails?: string;
  displayName?: string;
  sex?: string;
  message?: string;
  selectedDate?: string;
  selectedHospital?: string;
  selectedTime?: string;
  ticketNumber?: string;
  type?: string;
  checklistData?: { [key: string]: string };
  isComplete: boolean; // Add checklistData as an optional property
  // Add other properties as needed
}

export default function ManageTicketReview() {
  const { ticket } = useLocalSearchParams();
  const [ticketData, setTicketData] = useState<TicketState | null>(null);
  const [openChecklist, setOpenChecklist] = useState(false);
  const [openUserDetails, setOpenUserDetails] = useState(false);

  useEffect(() => {
    if (ticket) {
      setTicketData(JSON.parse(ticket as string)); // Deserialize the ticket data
    }
    console.log("TICKET REVIEW SCREEN" + ticket);
  }, [ticket]);

  if (!ticketData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    return moment(dateString, "YYYY-MM-DD").format("MMMM D, YYYY");
  };

  const handleUpdateStatus = async (status: "accepted" | "denied") => {
    if (!ticketData) return;

    const updatedTicketData = {
      ...ticketData,
      status: status,
      message: "deliberation",
    };

    try {
      const ticketDocRef = doc(FIRESTORE_DB, "ticketDonate", ticketData.id);
      await updateDoc(ticketDocRef, {
        status: updatedTicketData.status,
        message: updatedTicketData.message,
      });
      setTicketData(updatedTicketData);
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 24 }}>
        Ticket Details
      </Text>
      <View
        style={{
          flexDirection: "column",
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.grayMid,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Ticket Number:</Text>
        <Text
          style={{ fontSize: 20, color: COLORS.primary, fontWeight: "bold" }}
        >
          {ticketData.ticketNumber}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 5,
          }}
        >
          <FontAwesome6 name="calendar-day" size={18} color="black" />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 7 }}>
            {ticketData.selectedDate
              ? formatDate(ticketData.selectedDate)
              : "N/A"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: 5,
          }}
        >
          <FontAwesome6 name="clock" size={18} color="black" />
          <Text style={{ fontSize: 16, marginLeft: 5, fontWeight: "bold" }}>
            {ticketData.selectedTime}
          </Text>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
          Status: {ticketData.status}
        </Text>
        {ticketData.status == "accepted" ? (
          <Text style={{ fontSize: 16, fontWeight: "bold", margin: 5 }}>
            Status: {!ticketData.isComplete ? "IN-REVIEW" : "COMPLETED"}
          </Text>
        ) : null}
      </View>

      <Pressable
        style={card.qContainer}
        onPress={
          openUserDetails
            ? () => setOpenUserDetails(false)
            : () => setOpenUserDetails(true)
        }
        android_ripple={{ radius: 250 }}
      >
        <Text style={styles.checklistTitle}>User Details</Text>
        {openUserDetails ? (
          <IconBtn
            icon="minus"
            size={18}
            onPress={() => setOpenUserDetails(false)}
          />
        ) : (
          <IconBtn
            icon="plus"
            size={18}
            onPress={() => setOpenUserDetails(true)}
          />
        )}
      </Pressable>
      {openUserDetails ? (
        <View style={styles.checklistContainer}>
          <Text style={styles.textDetails}>
            Name: {ticketData.name || ticketData.displayName}
          </Text>
          <Text style={styles.textDetails}>City: {ticketData.city}</Text>
          <Text style={styles.textDetails}>
            Contact Details: {ticketData.contactDetails}
          </Text>
          <Text style={styles.textDetails}>Sex: {ticketData.sex}</Text>
          <Text style={styles.textDetails}>Age: {ticketData.age}</Text>
          <Text style={styles.textDetails}>
            User Email: {ticketData.userEmail}
          </Text>
        </View>
      ) : null}

      <Pressable
        style={card.qContainer}
        onPress={
          openChecklist
            ? () => setOpenChecklist(false)
            : () => setOpenChecklist(true)
        }
        android_ripple={{ radius: 250 }}
      >
        <Text style={styles.checklistTitle}>Preliminary Checklist</Text>
        {openChecklist ? (
          <IconBtn
            icon="minus"
            size={18}
            onPress={() => setOpenChecklist(false)}
          />
        ) : (
          <IconBtn
            icon="plus"
            size={18}
            onPress={() => setOpenChecklist(true)}
          />
        )}
      </Pressable>
      {openChecklist ? (
        <ScrollView style={styles.checklistContainer}>
          {ticketData.checklistData &&
          Object.keys(ticketData.checklistData).length > 0 ? (
            Object.entries(ticketData.checklistData).map(
              ([key, value], index) => (
                <View key={key} style={styles.checklistItem}>
                  <Text style={styles.checklistKey}>
                    {index + 1}. {key}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 30,
                    }}
                  >
                    <View style={styles.bullet} />
                    <Text style={styles.checklistValue}>{value}</Text>
                  </View>
                </View>
              )
            )
          ) : (
            <Text style={styles.noChecklistData}>
              No preliminary checklist data available.
            </Text>
          )}
        </ScrollView>
      ) : null}

      <View style={styles.buttonContainer}>
        <Button
          title="Accept"
          onPress={() => handleUpdateStatus("accepted")}
          color="green"
        />
        <Button
          title="Reject"
          onPress={() => handleUpdateStatus("denied")}
          color={COLORS.primary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    padding: 20,
  },
  textDetails: {
    fontSize: 16,
    marginVertical: 3,
  },
  checklistContainer: {
    width: "100%",
    marginLeft: 15,
  },
  checklistTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  checklistItem: {
    marginBottom: 10,
  },
  checklistKey: {
    fontWeight: "bold",
  },
  checklistValue: {
    fontSize: 16,
    fontWeight: "normal",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    width: "100%",
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4, // Makes the view a circle
    backgroundColor: "black",
    marginRight: 10,
  },
  noChecklistData: {
    fontSize: 16,
    fontStyle: "italic",
    color: COLORS.grayMid,
    marginTop: 10,
  },
});

const card = StyleSheet.create({
  qContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
  },
  question: {
    flex: 1,
    fontWeight: "bold",
  },
  aContainer: {
    width: "100%",
    minHeight: 35,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    paddingTop: 8,
    paddingBottom: 16,
  },
  answer: {
    flex: 1,
    flexDirection: "row",
  },
});
