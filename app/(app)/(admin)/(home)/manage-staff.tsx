import { COLORS } from "constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ManageStaff() {
  return (
    <View style={styles.container}>
      <Text>Manage Staff Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
