import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";

export default function LifelineLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Lifeline</Text>
        <Image
          style={styles.logo}
          source={require("../../assets/splash/icon.png")}
        />
      </View>
      <Text style={styles.subtitle}>Bloodbank management system</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 4,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
    width: 230,
  },
  title: {
    fontSize: SIZES.xxxLarge,
    fontWeight: "900",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    textTransform: "capitalize",
    width: 230,
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
