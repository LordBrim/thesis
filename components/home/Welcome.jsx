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
          <Text style={[styles.description, styles.txtDonate]}>
            Donate blood to someone in need.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.btnRequest]}
          onPress={toRequest}
        >
          <Text style={[styles.subtitle, styles.txtRequest]}>Request</Text>
          <Text style={[styles.description, styles.txtRequest]}>
            Request for compatible blood from a location.
          </Text>
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
    fontSize: SIZES.xLarge,
    color: "#000",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: { fontSize: SIZES.small },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SIZES.xxSmall,
  },
  button: {
    flex: 3,
    maxHeight: 90,
    aspectRatio: 16 / 9,
    borderRadius: SIZES.small,
    padding: SIZES.small,
    justifyContent: "space-between",
  },
  btnDonate: {
    backgroundColor: COLORS.primary,
  },
  btnRequest: {
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  txtDonate: {
    color: COLORS.white,
  },
  txtRequest: {
    color: COLORS.gray,
  },
});
