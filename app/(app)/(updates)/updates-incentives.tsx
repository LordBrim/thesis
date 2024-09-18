import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React from "react";
import {
  COLORS,
  HORIZONTAL_SCREEN_MARGIN,
  SIZES,
  SPACES,
} from "../../../constants";
import DonationIncentive from "components/home/DonationIncentive";

export default function UpdatesIncentives() {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Incentive Progress</Text>
      </View>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => <DonationIncentive checked={item.checked} />}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.flatlist}
      />
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
    backgroundColor: COLORS.white,
    flexDirection: "column",
    padding: HORIZONTAL_SCREEN_MARGIN,
    gap: HORIZONTAL_SCREEN_MARGIN,
    alignItems: "center",
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

  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: "bold",
  },
  subtitle: {
    textTransform: "capitalize",
  },
  flatlist: {
    flex: 1,
    flexDirection: "row",
    gap: SPACES.sm,
    width: "100%",
  },
});

const sampleData = [
  {
    id: 1,
    checked: true,
  },
  {
    id: 2,
    checked: false,
  },
  {
    id: 3,
    checked: false,
  },
  {
    id: 4,
    checked: false,
  },
];
