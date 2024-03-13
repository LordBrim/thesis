import { StyleSheet, Text, View } from "react-native";

export default function ManageBloodUnits() {
  return (
    <View style={styles.container}>
      <Text>Manage Blood Units Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
