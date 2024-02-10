import { StyleSheet, View, Text } from "react-native";

export default function UpcomingEvents() {
  return (
    <View style={styles.container}>
      <Text>Upcoming Blood Donation Events</Text>
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
