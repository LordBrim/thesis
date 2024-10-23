import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SPACES, SIZES, COLORS } from "../../constants";

type IActionBtn = {
  href: string;
  title: string;
  subtitle: string;
  cta?: boolean;
};

export default function ActionBtn({ href, title, subtitle, cta }: IActionBtn) {
  return (
    <Link
      asChild
      href={href}
      style={[
        styles.container,
        cta ? styles.ctaContainer : styles.defaultContainer,
      ]}
    >
      <TouchableOpacity>
        <Text
          style={[styles.title, cta ? styles.ctaTitle : styles.defaultTitle]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            cta ? styles.ctaSubtitle : styles.defaultSubtitle,
          ]}
        >
          {subtitle}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 90,
    width: "50%",
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SPACES.md,
    justifyContent: "space-between",
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
  },
  ctaContainer: {
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  defaultTitle: {},
  ctaTitle: {
    color: COLORS.background,
  },
  subtitle: {
    fontSize: SIZES.small,
  },
  defaultSubtitle: {
    color: COLORS.gray,
  },
  ctaSubtitle: {
    color: COLORS.background,
  },
});
