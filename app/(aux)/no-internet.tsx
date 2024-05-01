import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function NoInternetScreen() {
  return (
    <View style={styles.container}>
      <Text>Check Your Internet Connection</Text>
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
