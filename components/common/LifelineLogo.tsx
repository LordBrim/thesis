import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../../constants";

export default function LifelineLogo() {
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth * 0.7;
  const imageHeight = imageWidth * 0.2;

  return (
    <View style={styles.container}>
      <Image
        style={{ height: imageHeight, width: imageWidth }}
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
