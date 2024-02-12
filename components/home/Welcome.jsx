import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../../constants/theme";

export default function Welcome({ toDonate, toRequest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Lifeline, User</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.btnDonate]}
          onPress={toDonate}
        >
          <Text style={[styles.subtitle, styles.txtDonate]}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.btnRequest]}
          onPress={toRequest}
        >
          <Text style={[styles.subtitle, styles.txtRequest]}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: SIZES.medium,
  },
  title: {
    fontFamily: "Bakbakone",
    fontSize: 24,
    color: "#000",
  },
  subtitle: {
    fontFamily: "Raleway_Semibold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  buttons: {
    flexDirection: "row",
    height: 120,
    maxHeight: 120,
    gap: SIZES.xxSmall,
  },
  button: {
    flex: 3,
    maxHeight: 90,
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SIZES.small,
  },
  btnDonate: {
    backgroundColor: COLORS.primary,
  },
  txtDonate: {
    color: COLORS.white,
  },
  btnRequest: {
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  txtRequest: {
    color: COLORS.gray,
  },
});
