import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GS } from "../../../constants";

type ITitle = {
  title: string;
};

export default function Title({ title }: ITitle) {
  return (
    <View style={styles.container}>
      <Text style={GS.h1}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
