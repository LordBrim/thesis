import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";

type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
};

const RadioButton = ({ label, value, selected, onPress }: RadioButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={24}
        color={selected ? COLORS.primary : COLORS.gray}
      />
      <Text style={styles.label}>{label}</Text>
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
});

export default RadioButton;
