import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { Children, ReactNode, useState } from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { MINOR_COMPONENT_HEIGHT } from "../../constants/measurements";
import { Ionicons } from "react-native-vector-icons";
import useTogglePasswordVisibility from "hooks/useTogglePasswordVisibility";

type TextInputWrapper = {
  label: string;
  isPassword?: boolean;
  children: React.ReactNode;
};

export default function TextInputWrapper({
  label,
  children,
}: TextInputWrapper) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: MINOR_COMPONENT_HEIGHT,
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SIZES.xxxSmall,
  },
  label: {
    fontWeight: "bold",
    textTransform: "capitalize",
    position: "absolute",
    left: 6,
    top: -10.5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 4,
    borderRadius: 50,
  },
});
