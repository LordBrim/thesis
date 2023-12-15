import { StyleSheet, Dimensions } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../constants";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: (screenWidth * 80) / 100,
    padding: SIZES.medium,
    borderWidth: 1,
    marginBottom: SIZES.large,
    borderRadius: 15,
    borderColor: COLORS.gray2,
  },
  questionBody: {
    flexDirection: "row",
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionTitle: {
    fontFamily: FONT.Grotesk,
    fontWeight: "bold",
    color: COLORS.redWhite,
  },
  iconToggle: {
    marginLeft: SIZES.small,
    width: 20,
    height: 20,
  },
  answerBody: {
    marginTop: SIZES.small,
    padding: SIZES.small,
    borderRadius: 15,
    backgroundColor: COLORS.redWhite,
  },
  answerText: {
    color: COLORS.white,
  },
});

export default styles;
