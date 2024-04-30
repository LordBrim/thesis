import { StyleSheet } from "react-native";
export const TwoInputsRow = ({ children }) => (
  <View style={styles.twoInputsRow}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  inputContainer: {
    margin: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  twoInputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainer: {
    marginVertical: 10,
  },
});
