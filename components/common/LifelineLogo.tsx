import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";

export default function LifelineLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require("../../assets/splash/icon.png")}
        />
        <Text style={styles.title}>Lifeline</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 230,
  },
  title: {
    fontSize: SIZES.xxxLarge,
    fontFamily: "Poppins_900Black",
    color: COLORS.primary,
    paddingBottom: 4,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
});
