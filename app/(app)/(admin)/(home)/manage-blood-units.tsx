import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../../../constants";

export default function ManageBloodUnits() {
  return (
    <View style={styles.container}>
      <Text>Manage Blood Units</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
