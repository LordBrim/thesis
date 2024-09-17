import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import React from "react";

type IAvatar = {
  avatarUrl: ImageSourcePropType;
  onEdit: () => void;
};

export default function Avatar({ avatarUrl, onEdit }: IAvatar) {
  return (
    <Pressable onPress={onEdit}>
      <View style={styles.container}>
        <Image style={styles.image} source={avatarUrl} resizeMode="cover" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
