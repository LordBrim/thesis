import { View, Text, StyleSheet } from "react-native";
import React from "react";

type IAvater = {
  avatarUrl: string;
};

export default function Avatar({ avatarUrl }: IAvater) {
  return (
    <View style={styles.container}>
      <Text>Avatar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 200,
    backgroundColor: "black",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
