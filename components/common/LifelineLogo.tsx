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

  logo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
