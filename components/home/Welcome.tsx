import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, SPACES } from "../../constants/theme";
import { Link } from "expo-router";
import ActionBtn from "./ActionBtn";

export default function Welcome({ toDonate, toRequest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Started</Text>

      <View style={styles.buttons}>
        <ActionBtn
          href={toDonate}
          title="Donate"
          subtitle="Donate blood to someone in need."
          cta
        />
        <ActionBtn
          href={toRequest}
          title="Request"
          subtitle="Request for compatible blood from a location."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    gap: SPACES.md,
  },
  buttons: {
    flexDirection: "row",
    height: 90,
    gap: SPACES.sm,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
