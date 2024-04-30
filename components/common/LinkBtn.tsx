import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { type Href, Link } from "expo-router";

type ILinkBtn = {
  label: string;
  href: Href<string>;
};

export default function LinkBtn({ label, href }: ILinkBtn) {
  return (
    <Link asChild href={href}>
      <TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
