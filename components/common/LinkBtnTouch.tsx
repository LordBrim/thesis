import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { TouchableOpacity } from "react-native";

type ILinkBtn = {
  label: string;
  onPress?: () => void;
  linkStyle?: StyleProp<TextStyle>;
};

export default function LinkBtnTouch({ label, onPress, linkStyle }: ILinkBtn) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={linkStyle || styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Poppins_700Bold",
    textDecorationLine: "underline",
    color: COLORS.primary,
  },
});
