import { StyleSheet, Text, View } from "react-native";

export default function ManageEvents() {
  return (
    <View style={styles.container}>
      <Text>Manage Events Screen</Text>
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
