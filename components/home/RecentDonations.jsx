import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default function RecentDonations({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Recent Donations</Text>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate(About, { screen: "DonationHistory" })
        }
      >
        <Text>View All</Text>
      </TouchableHighlight>
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
