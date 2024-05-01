import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function TermsAndConditionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Terms And Conditions Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
