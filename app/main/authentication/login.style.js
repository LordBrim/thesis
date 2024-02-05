import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingVertical: SIZES.xxxLarge,
    paddingHorizontal: SIZES.medium,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignContent: "center",
  },
  containerTop: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  containerCenter: {
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
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  title: {},
  subtitle: {},
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
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    padding: SIZES.medium,
    color: COLORS.white,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
    textTransform: "uppercase",
  },
  link: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default styles;
