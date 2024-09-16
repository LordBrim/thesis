import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import React from "react";

type IAvater = {
  avatarUrl: ImageSourcePropType;
};

export default function Avatar({ avatarUrl }: IAvater) {
  return (
    <ImageBackground
      style={styles.container}
      source={avatarUrl}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 200,
    backgroundColor: "black",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
