import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { SIZES, COLORS, HORIZONTAL_SCREEN_MARGIN } from "../../../constants";
import AppointmentCard from "components/home/AppointmentCard";

export default function UpdatesGeneral() {
  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {Filters.map((filter) => (
          <Pressable key={filter.id}>
            <Text style={styles.filter}>{filter.title}</Text>
          </Pressable>
        ))}
      </View>
      <View style={{ gap: 8, flex: 1, width: "100%" }}>
        <AppointmentCard
          location="Request Accepted"
          date="Sept 18, 2024"
          time="1:01pm"
        />
        <AppointmentCard
          location="Request Accepted"
          date="Sept 18, 2024"
          time="1:01pm"
        />
      </View>
    </View>
  );
}

const Filters = [
  { id: 0, title: "All" },
  { id: 1, title: "Appointments" },
  { id: 2, title: "Requests" },
  { id: 3, title: "Donations" },
  { id: 4, title: "Incentives" },
];

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    alignItems: "center",
    backgroundColor: COLORS.white,
    gap: HORIZONTAL_SCREEN_MARGIN,
  },
  filters: {
    flexDirection: "row",
    gap: 4,
    width: "100%",
  },
  filter: {
    fontSize: SIZES.xSmall,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: COLORS.slate500,
  },
});
