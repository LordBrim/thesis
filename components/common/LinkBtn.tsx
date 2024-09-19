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
  href: Href<string>;
  linkStyle?: StyleProp<TextStyle>;
};

export default function LinkBtn({ label, href, linkStyle }: ILinkBtn) {
  return (
    <Link asChild href={href}>
      <TouchableOpacity>
        <Text style={linkStyle || styles.label}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: COLORS.primary,
  },
});
