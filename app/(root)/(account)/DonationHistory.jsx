import { StyleSheet, View, Text } from "react-native";

export default function DonationHistory() {
  return (
    <View style={styles.container}>
      <Text>DonationHistory Screen</Text>
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
