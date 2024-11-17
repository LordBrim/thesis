import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../constants";

type IDescription = {
  description: string;
};

export default function Description({ description }: IDescription) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  description: {
    fontSize: SIZES.medium,
    textAlign: "justify",
    color: COLORS.gray,
    fontFamily: "Poppins_400Regular",
  },
});
