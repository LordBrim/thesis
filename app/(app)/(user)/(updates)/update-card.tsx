import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants/";

const UpdateCard = ({ update }) => {
  const { type, status = "", message, date, time, hospital } = update;
  const size = 24;
  const lowerCaseStatus = status?.toLowerCase();
  console.log(update.message, update.status, update.type);
  return (
    <Pressable android_ripple={{ radius: 200 }} style={styles.cardContainer}>
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
        {message === "deliberation" && lowerCaseStatus === "accepted" && (
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
        {message === "deliberation" && lowerCaseStatus === "denied" && (
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
            <Text style={{ fontWeight: "700" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
            . We would be happy to see you again for another donation.
          </Text>
        )}
        {message === "sent" && (
          <Text style={styles.cardMessage}>
            Your request for a{" "}
            {type === "appointment" && "donation appointment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && "transfer of blood units"} is successfully
            sent to
            <Text style={{ fontWeight: "700" }}>
              {" "}
              {hospital || "all partnered hospital"}
            </Text>
            .
          </Text>
        )}
        {message === "deliberation" && (
          <Text style={styles.cardMessage}>
            Your request for a{" "}
            {type === "appointment" && "donation appointment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && `transfer of blood units`} is{" "}
            {lowerCaseStatus === "accepted" ? (
              <Text style={{ color: "green", fontWeight: "700" }}>
                accepted
              </Text>
            ) : (
              <Text style={{ color: "red", fontWeight: "700" }}>declined</Text>
            )}{" "}
            by
            <Text style={{ fontWeight: "700" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
          </Text>
        )}
        {message === "incentives" && (
          <Text style={styles.cardMessage}>
            You are now qualified to claim the incentives for{" "}
            <Text style={{ fontWeight: "700" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
          </Text>
        )}
        <Text style={styles.cardDatetime}>
          {date || "Unknown date"} At {time || "Unknown time"}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    padding: HORIZONTAL_SCREEN_MARGIN,
    borderBottomWidth: 1,
    borderColor: COLORS.slate100,
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

export default UpdateCard;
