import { Text, StyleSheet, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";

type IAccountCard = {
  href: string;
  icon: string;
  label: string;
};

export default function AccountCard({ href, icon, label }: IAccountCard) {
  return (
    <Link asChild replace href={href}>
      <View style={styles.container}>
        <FontAwesome6 name={icon} size={28} color={COLORS.primary} />
        <Text style={styles.label}>{label || "AccountCard"}</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  label: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    borderWidth: 1,
  },
});
