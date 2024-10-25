import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { type Href, Link } from "expo-router";
import { GS } from "../../constants";

type ILinkBtn = {
  label: string;
  href?: Href<string>;
  onPress?: () => void;
  linkStyle?: StyleProp<TextStyle>;
};

export default function LinkBtn({
  label,
  href,
  onPress,
  underline,
  secondary,
}: ILinkBtn) {
  if (href) {
    return (
      <Link asChild href={href}>
        <TouchableOpacity>
          <Text
            style={[
              secondary ? GS.link2 : GS.link1,
              underline && styles.underline,
            ]}
          >
            {label}
          </Text>
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
  underline: {
    textDecorationLine: "underline",
  },
});
