import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";

export default function LifelineLogo() {
  return (
    <View style={styles.container}>
      <Image
        style={{ height: 70, width: "75%" }}
        source={require("../../assets/images/lifeline_logo_text.png")}
      />
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
    alignItems: "center",
    width: 230,
  },
  title: {
    fontSize: SIZES.xxxLarge,
    fontFamily: "Poppins_900Black",
    color: COLORS.primary,
    marginTop: 20,
  },
});
