import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  header: {
    fontFamily: FONT.Grotesk,
    fontSize: SIZES.xLarge,
    marginBottom: SIZES.medium,
    marginTop: 30,
  },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: COLORS.gray,
    borderWidth: 1,
    width: 100,
    shadowColor: "black",
    elevation: 5,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
});

export default styles;
