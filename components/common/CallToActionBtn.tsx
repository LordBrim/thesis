import {
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { MINOR_COMPONENT_HEIGHT } from "../../constants/measurements";

type ICallToActionBtn = {
  label: string;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

export default function CallToActionBtn({
  label,
  onPress,
  style,
}: ICallToActionBtn) {
  return (
    <Pressable
      style={[styles.container, style]}
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
    height: MINOR_COMPONENT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  label: {
    fontSize: SIZES.medium,
    textTransform: "capitalize",
    fontWeight: "bold",
    color: COLORS.white,
  },
});
