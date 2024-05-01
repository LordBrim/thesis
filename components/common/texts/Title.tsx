import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SIZES, FONT, COLORS } from "../../../constants";

type ITitle = {
  title: string;
};

export default function Title({ title }: ITitle) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
