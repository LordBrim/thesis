import { useContext } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

import { SignedInContext } from "../../../context/SignedInContext";

export default function Account() {
  const [isSignedIn, setIsSignedIn] = useContext(SignedInContext);

  return (
    <View style={styles.container}>
      <Text>Account</Text>
      <TouchableHighlight onPress={() => setIsSignedIn(false)}>
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
