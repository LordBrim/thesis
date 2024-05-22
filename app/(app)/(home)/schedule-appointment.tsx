import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ScheduleAppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text>schedule-appointment</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
