import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { type Href, Link } from "expo-router";
import { GS } from "../../constants";

type ILinkBtn = {
  label: string;
  href?: Href<string>;
  underline?: boolean;
  secondary?: boolean;
};

export default function LinkBtn({
  label,
  href,
  underline,
  secondary,
}: ILinkBtn) {
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

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: "underline",
  },
});
