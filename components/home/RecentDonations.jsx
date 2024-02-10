import { StyleSheet, View, Text } from "react-native";

export default function RecentDonations() {
  return (
    <View style={styles.container}>
      <Text>Recent Donations</Text>
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
