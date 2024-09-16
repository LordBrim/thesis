import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { Link } from "expo-router";
import { FontAwesome6, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { FIREBASE_AUTH } from "../../../firebase-config";
import { HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import { IAccountCard } from "constants/Interfaces";
import Avatar from "components/common/Avatar";

type IAccountTab = {
  avatarUrl: string;
  username: string;
  email: string;
  phoneNumber?: string;
};

export default function AccountTab({
  avatarUrl,
  username,
  phoneNumber,
}: IAccountTab) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const user = FIREBASE_AUTH.currentUser;
    if (user) {
      setEmail(user.email);
    }
  }, []);

  // Temporary Data for front-end only. Remove later on firebase integration
  const temporaryData = {
    avatarUrl: require("../../../assets/images/man.jpg"),
    username: "Eldon Gray",
    email: "lifelineisthebest@gmail.com",
    donations: "25",
    received: "3",
    status: "Available",
  };
  // Temporary Data for front-end only. Remove later on firebase integration

  const size = 22;
  const [status, setStatus] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Avatar avatarUrl={temporaryData.avatarUrl} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.title}>{temporaryData.username}</Text>
          <Text style={styles.subtitle}>{temporaryData.email}</Text>
        </View>
      </View>

      <View style={styles.donations}>
        <Text
          style={[
            styles.title,
            { color: COLORS.black, fontSize: SIZES.medium },
          ]}
        >
          Donation Status:{" "}
          {status ? (
            <Text style={{ color: "green" }}>Available</Text>
          ) : (
            <Text style={{ color: "red" }}>Locked</Text>
          )}
        </Text>
        <Text style={styles.subtitle}>
          Units Donated:{" "}
          <Text style={{ fontWeight: "400" }}>{temporaryData.donations}</Text>
        </Text>
        <Text style={styles.subtitle}>
          Units Received:{" "}
          <Text style={{ fontWeight: "400" }}>{temporaryData.received}</Text>
        </Text>
      </View>

      <View style={styles.flatlist}>
        <Card
          href="/donation-history"
          icon={
            <FontAwesome5 name="history" size={size} color={COLORS.black} />
          }
          label="donation history"
        />
        <Card
          href="/profile"
          icon={
            <MaterialIcons name="person" size={size} color={COLORS.black} />
          }
          label="profile"
        />
        <Card
          href="/settings"
          icon={<FontAwesome6 name="gear" size={size} color={COLORS.black} />}
          label="settings"
        />
      </View>

      <View style={styles.flatlist}>
        <Card
          href="/about"
          icon={
            <FontAwesome6 name="circle-info" size={size} color={COLORS.black} />
          }
          label="about"
        />
        <Card
          href="/help"
          icon={
            <FontAwesome5
              name="question-circle"
              size={size}
              color={COLORS.black}
            />
          }
          label="help"
        />
      </View>

      <View style={styles.flatlist}>
        <Card
          href="/login"
          icon={
            <FontAwesome6 name="power-off" size={size} color={COLORS.primary} />
          }
          label="logout"
        />
      </View>
    </ScrollView>
  );
}

const Card = ({ href, icon, label, sublabel }: IAccountCard) => (
  <Link asChild replace href={href}>
    <Pressable style={styles.card} android_ripple={{ radius: 200 }}>
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      {sublabel && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profile: {
    flexDirection: "row",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  donations: {
    margin: HORIZONTAL_SCREEN_MARGIN,
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    padding: 16,
    elevation: 3,
    overflow: "hidden",
    borderRadius: SIZES.small,
    flex: 1,
    gap: 4,
    backgroundColor: COLORS.white,
    position: "relative",
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: "500",
  },
  flatlist: {
    flex: 1,
    marginHorizontal: HORIZONTAL_SCREEN_MARGIN,
    marginTop: HORIZONTAL_SCREEN_MARGIN,
    overflow: "hidden",
    borderRadius: 12,
    shadowRadius: 12,
  },
  card: {
    flex: 1,
    width: "100%",
    maxHeight: 50,
    flexDirection: "row",
    paddingVertical: 12,
    gap: 6,
    alignItems: "center",
  },
  icon: {
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    width: "100%",
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
