import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "constants/theme";

export default function ManageTicketReview() {
  return (
    <View style={styles.container}>
      <Text>Dito mo lalagay ung ticket detail na ginawa mo kanina</Text>
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
