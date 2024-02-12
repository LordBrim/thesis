import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { SIZES } from "../../constants/theme";

export default function RecentDonations({ toDonationHistory }) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Text style={styles.title}>Recent Donations</Text>
        <TouchableHighlight onPress={toDonationHistory}>
          <Text>View All</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
