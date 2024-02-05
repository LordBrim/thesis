import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: SIZES.xxxLarge,
    paddingHorizontal: SIZES.large,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignContent: "center",
  },
  // containerTop: {
  //   width: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   gap: 20,
  // },
  containerTop: {
    gap: SIZES.xxxLarge,
  },
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: SIZES.xSmall,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: "900",
    textTransform: "uppercase",
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: SIZES.medium,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  header: {
    fontWeight: "bold",
    fontSize: SIZES.xxLarge,
    textTransform: "capitalize",
  },
  field: {
    gap: SIZES.xxxSmall,
  },
  formName: {
    fontWeight: "bold",
  },
  formInput: {
    width: "100%",
    padding: SIZES.xSmall,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.gray,
  },
  formCta: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
  },
  formCtaText: {
    textTransform: "uppercase",
    color: COLORS.white,
  },
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default styles;
