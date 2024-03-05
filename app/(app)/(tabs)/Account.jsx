import { useContext } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

import { SignedInContext } from "../../../context/SignedInContext";

export default function Account({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useContext(SignedInContext);

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => navigation.navigate("DonationHistory")}
      >
        <Text>Donation History</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Profile")}>
        <Text>Profile</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Settings")}>
        <Text>Settings</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("About")}>
        <Text>About</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate("Help")}>
        <Text>Help</Text>
      </TouchableHighlight>
      <TouchableHighlight>
        <Text>Logout</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
  },
});
