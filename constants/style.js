"use strict";

import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const GS = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    textTransform: "capitalize",
  },
  h2: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textTransform: "capitalize",
  },
  h3: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    textTransform: "capitalize",
  },
  link1: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.primary,
  },
  link2: {
    fontFamily: "Poppins_700Bold",
    color: COLORS.grayMid,
  },
});
