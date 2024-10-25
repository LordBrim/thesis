import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import { type Href, Link } from "expo-router";
import { COLORS } from "../../constants";

type ILinkBtn = {
  label: string;
  href?: Href<string>;
  onPress?: () => void;
  linkStyle?: StyleProp<TextStyle>;
};

export default function LinkBtn({ label, href, onPress, linkStyle }: ILinkBtn) {
  if (href) {
    return (
      <Link asChild href={href}>
        <TouchableOpacity>
          <Text style={linkStyle || styles.label}>{label}</Text>
        </TouchableOpacity>
      </Link>
    );
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={linkStyle || styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: COLORS.primary,
  },
});
