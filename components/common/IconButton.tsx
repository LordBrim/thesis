import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

type IIconBtn = {
  icon: string;
  size: number;
  onPress?: () => void;
  color?: string;
};

export default function IconBtn({ icon, size, onPress, color }: IIconBtn) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      aria-label="button"
      android_ripple={{
        borderless: false,
        radius: 20,
      }}
    >
      <FontAwesome6 name={icon} size={size} color={color || "black"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
