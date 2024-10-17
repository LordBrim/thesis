"use strict";

import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const GS = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  h2: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  h3: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  link1: {},
  link2: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: COLORS.grayMid,
    textDecorationLine: "none",
  },
});
