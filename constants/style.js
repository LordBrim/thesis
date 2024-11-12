"use strict";

import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const GS = StyleSheet.create({
  h1: {
    fontSize: 24,
    // fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
    textTransform: "capitalize",
  },
  h2: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    // fontWeight: "bold",
    textTransform: "capitalize",
  },
  h3: {
    fontSize: 18,
    // fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
    textTransform: "capitalize",
  },
  link1: {
    // fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
    color: COLORS.primary,
  },
  link2: {
    // fontWeight: "bold",
    fontFamily: "Montserrat_700Bold",
    color: COLORS.grayMid,
  },
});
