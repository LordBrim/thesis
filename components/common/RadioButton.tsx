import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";

type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  isDisable?: boolean;
  onPress: () => void;
};

const RadioButton = ({
  label,
  value,
  selected,
  onPress,
  isDisable = false,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isDisable}
    >
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={24}
        color={selected ? COLORS.primary : COLORS.grayDark}
      />
      <Text style={isDisable ? styles.labelGrayed : styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SIZES.small,
  },
  label: {
    marginLeft: SIZES.xSmall,
    fontSize: SIZES.medium,
  },
  labelGrayed: {
    marginLeft: SIZES.xSmall,
    fontSize: SIZES.medium,
    color: COLORS.grayDark,
  },
});

export default RadioButton;
