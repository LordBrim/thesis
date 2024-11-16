import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../../constants/";

const UpdateCard = ({ update }) => {
  const {
    type,
    status = "",
    message,
    date,
    time,
    hospital,
    isComplete,
  } = update;
  const size = 24;
  const lowerCaseStatus = status?.toLowerCase();
  console.log(update.message, update.status, update.type);
  return (
    <Pressable android_ripple={{ radius: 250 }} style={styles.cardContainer}>
      <View style={{ height: 35, width: 35 }}>
        {message === "completed" && (
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
        {message === "deliberation" && lowerCaseStatus === "rejected" && (
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
        {message === "deliberation" && lowerCaseStatus === "missing" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#ffb1b1",
              },
            ]}
          >
            <Ionicons name="alert-circle" size={24} color="#ff3333" />
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
        {isComplete && lowerCaseStatus === "accepted" && (
          <View
            style={[
              styles.cardIcon,
              {
                backgroundColor: "#d4edda",
              },
            ]}
          >
            <Ionicons
              name="checkmark-done-circle"
              size={size}
              color="#28a745"
            />
          </View>
        )}
      </View>
      <View style={{ width: "100%", flex: 1, gap: 2 }}>
        {message === "completed" && (
          <Text style={styles.cardMessage}>
            Thank you for donating your blood at
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
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
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
              {" "}
              {hospital || "all partnered hospital"}
            </Text>
            .
          </Text>
        )}
        {message === "deliberation" && lowerCaseStatus !== "rejected" && (
          <Text style={styles.cardMessage}>
            Your request for a{" "}
            {type === "appointment" && "donation appointment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && `transfer of blood units`} is{" "}
            {lowerCaseStatus === "accepted" ? (
              <Text style={{ color: "green", fontFamily: "Poppins_700Bold" }}>
                accepted
              </Text>
            ) : (
              <Text style={{ color: "red", fontFamily: "Poppins_700Bold" }}>
                declined
              </Text>
            )}{" "}
            by
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
          </Text>
        )}
        {message === "incentives" && lowerCaseStatus !== "missing" && (
          <Text style={styles.cardMessage}>
            You are now qualified to claim the incentives for{" "}
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
          </Text>
        )}
        {message === "deliberation" && lowerCaseStatus === "missing" ? (
          <Text style={styles.cardMessage}>
            You have not showed up for the appointment at
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
              {" "}
              {hospital || "the hospital"}
            </Text>
          </Text>
        ) : null}
        {isComplete && lowerCaseStatus === "accepted" && (
          <Text style={styles.cardMessage}>
            Your request for a{" "}
            {type === "appointment" && "donation appointment"}
            {type === "request" && "blood unit"}
            {type === "transfer" && `transfer of blood units`} has been{" "}
            <Text style={{ color: "green", fontFamily: "Poppins_700Bold" }}>
              completed
            </Text>{" "}
            at
            <Text style={{ fontFamily: "Poppins_700Bold" }}>
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
  },
  cardDatetime: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.slate500,
    fontSize: 12,
  },
});

export default UpdateCard;
