import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";

type ICallToActionBtn = {
  label: string;
  onPress: () => void;
};

export default function CallToActionBtn({ label, onPress }: ICallToActionBtn) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      android_ripple={{ radius: 200 }}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  label: {
    fontSize: SIZES.medium,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.white,
  },
});
