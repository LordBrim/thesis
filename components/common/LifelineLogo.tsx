import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";

export default function LifelineLogo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lifeline</Text>
      <Image
        style={styles.logo}
        source={require("../../assets/splash/icon.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 30,
  },
  title: {
    fontSize: SIZES.xxxLarge,
    fontWeight: "900",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
