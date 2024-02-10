import { View, Text, TouchableHighlight } from "react-native";

import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import { useContext } from "react";

import { SignInContext } from "../../index";

export default function Account() {
  const [isSignedIn, setIsSignedIn] = useContext(SignInContext);

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
