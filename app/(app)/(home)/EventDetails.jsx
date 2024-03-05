import { StyleSheet, Text, View } from "react-native";

export default function EventDetails() {
  return (
    <View style={styles.container}>
      <Text>Event Screen</Text>
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
