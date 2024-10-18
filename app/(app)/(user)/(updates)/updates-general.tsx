import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { SIZES, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function UpdatesGeneral() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, width: "100%" }} overScrollMode="never">
        {updatesData.map((update, id) => (
          <UpdateCard
            key={id}
            type={update.type}
            status={update.status}
            message={update.message}
            date={update.date}
            time={update.time}
            hospital={update.hospital}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function UpdateCard({ type, status, message, date, time, hospital }) {
  const size = 24;

  return (
    <Pressable android_ripple={{ radius: 300 }} style={styles.cardContainer}>
      <View style={{ height: 35, width: 35 }}>
        {message === "thanks" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#ffcdd9",
              },
            ]}
          >
            <Ionicons name="heart" size={size} color="#ff4d7a" />
          </View>
        )}
        {message === "sent" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#ccdcf9",
              },
            ]}
          >
            <Ionicons name="information-circle" size={size} color="#1f66e5" />
          </View>
        )}
        {message === "deliberation" && status === "accepted" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#b0ecb0",
              },
            ]}
          >
            <Ionicons name="checkmark-circle" size={size} color="#32cd32" />
          </View>
        )}
        {message === "deliberation" && status === "declined" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#ffb1b1",
              },
            ]}
          >
            <Ionicons name="close-circle" size={size} color="#ff3333" />
          </View>
        )}
        {message === "incentives" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#f4e3b6",
              },
            ]}
          >
            <AntDesign name="star" size={size} color="#daa520" />
          </View>
        )}
      </View>
      <View style={{ width: "100%", flex: 1, gap: 2 }}>
        {message === "thanks" && (
          <Text style={styles.cardMessage}>
            Thank you for donating your blood at
            <Text style={{ fontWeight: "700" }}> {hospital}</Text>. We would be
            happy to see you again for another donation.
          </Text>
        )}
        {message === "sent" && (
          <Text style={styles.cardMessage}>
            Your request for a {type === "appointment" && "donation appoinment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && "transfer of blood units"} is successfuly
            sent to
            <Text style={{ fontWeight: "700" }}> {hospital}</Text>.
          </Text>
        )}
        {message === "deliberation" && (
          <Text style={styles.cardMessage}>
            Your request for a {type === "appointment" && "donation appoinment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && `transfer of blood units`} is{" "}
            {status === "accepted" ? (
              <Text style={{ color: "green", fontWeight: "700" }}>
                accepted
              </Text>
            ) : (
              <Text style={{ color: "red", fontWeight: "700" }}>declined</Text>
            )}{" "}
            by
            <Text style={{ fontWeight: "700" }}> {hospital}</Text>
          </Text>
        )}
        {message === "incentives" && (
          <Text style={styles.cardMessage}>
            You are now qualified to claim the incentives for{" "}
            <Text style={{ fontWeight: "700" }}> {hospital}</Text>
          </Text>
        )}
        <Text style={styles.cardDatetime}>
          {date} At {time}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  filters: {
    flexDirection: "row",
    gap: 4,
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: HORIZONTAL_SCREEN_MARGIN,
    justifyContent: "space-between",
    elevation: 3,
    backgroundColor: "white",
  },
  filter: {
    fontSize: SIZES.xSmall,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: COLORS.slate500,
    padding: HORIZONTAL_SCREEN_MARGIN,
  },
  cardContainer: {
    width: "100%",
    padding: HORIZONTAL_SCREEN_MARGIN,
    flexDirection: "row",
    gap: 12,
  },
  cardIcon: {
    height: 35,
    width: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardMessage: {
    width: "auto",
    fontWeight: "400",
  },
  cardDatetime: {
    fontWeight: "700",
    color: COLORS.slate500,
    fontSize: 12,
  },
});

const updatesData = [
  {
    type: "donations",
    message: "thanks",
    date: "Sept 18, 2024",
    time: "1:01pm",
    hospital: "Lourdes Hospital",
  },
  {
    type: "appointment",
    message: "sent",
    status: "pending",
    date: "Sept 18, 2024",
    time: "1:00pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "appointment",
    message: "deliberation",
    status: "accepted",
    date: "Sept 18, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "appointment",
    message: "deliberation",
    status: "declined",
    date: "Sept 18, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "request",
    message: "sent",
    status: "pending",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "request",
    message: "deliberation",
    status: "accepted",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "request",
    message: "deliberation",
    status: "declined",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "incentives",
    message: "incentives",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "transfer",
    message: "sent",
    status: "none",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "transfer",
    message: "deliberation",
    status: "accepted",
    units: "25",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
  {
    type: "transfer",
    message: "deliberation",
    status: "declined",
    date: "Sept 19, 2024",
    time: "1:20pm",
    hospital: "UERM Medical Center",
  },
];
