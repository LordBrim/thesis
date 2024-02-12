import { StyleSheet, View, Text } from "react-native";
import { SIZES } from "../../constants/theme";

export default function UpcomingEvents() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Blood Donation Events</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
